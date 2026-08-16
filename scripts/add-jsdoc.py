import sys, os, re

def walk(dirpath):
    files=[]
    for root,dirs,filenames in os.walk(dirpath):
        for fn in filenames:
            if fn.endswith(('.ts','.js','.tsx','.jsx')):
                files.append(os.path.join(root,fn))
    return files

def has_jsdoc_above(lines, idx):
    i = idx-1
    while i>=0:
        l = lines[i].strip()
        if l=='':
            i-=1
            continue
        return l.startswith('/**')
    return False

param_regex = re.compile(r"(\w+)\s*:\s*([^,=]+)")
return_regex = re.compile(r":\s*([^\s{=>]+)")

def make_jsdoc_for_function(signature):
    params_match = re.search(r"\(([^)]*)\)", signature)
    ret_match = return_regex.search(signature)
    params = params_match.group(1).strip() if params_match else ''
    param_list = [p.strip() for p in params.split(',')] if params else []
    lines = ['/**', ' * TODO: Describe function.']
    for p in param_list:
        if not p:
            continue
        m = param_regex.match(p)
        if m:
            name = m.group(1)
            typ = m.group(2).strip()
            lines.append(f' * @param {{{typ}}} {name}')
        else:
            name = p.split('=')[0].split(':')[0].strip()
            if name:
                lines.append(f' * @param {*} {name}')
    if ret_match:
        r = ret_match.group(1)
        lines.append(f' * @returns {{{r}}}')
    lines.append(' */')
    return '\n'.join(lines)


def make_jsdoc_for_class():
    return '/**\n * TODO: Describe class.\n */'


def process_file(file):
    with open(file,'r',encoding='utf-8') as f:
        raw = f.read()
    lines = raw.splitlines()
    out=[]
    changed=False
    for i,line in enumerate(lines):
        trimmed=line.strip()
        if re.match(r'^export\s+(async\s+)?function\s+\w+\s*\(', trimmed) or re.match(r'^export\s+function\s+\w+\s*\(', trimmed):
            if not has_jsdoc_above(lines,i):
                jsdoc = make_jsdoc_for_function(trimmed)
                out.append(jsdoc)
                changed=True
        elif re.match(r'^export\s+class\s+\w+', trimmed):
            if not has_jsdoc_above(lines,i):
                out.append(make_jsdoc_for_class())
                changed=True
        elif re.match(r'^export\s+const\s+\w+\s*=\s*\(', trimmed) or re.match(r'^export\s+const\s+\w+\s*=\s*async\s*\(', trimmed) or re.match(r'^export\s+const\s+\w+\s*=\s*\w+\s*=>', trimmed):
            if not has_jsdoc_above(lines,i):
                sig = trimmed
                j=i
                while j < len(lines) and '=>' not in sig and '{' not in sig:
                    j+=1
                    if j < len(lines):
                        sig += ' ' + lines[j].strip()
                jsdoc = make_jsdoc_for_function(sig)
                out.append(jsdoc)
                changed=True
        elif re.match(r'^export\s+default\s+function\s+\w+\s*\(', trimmed):
            if not has_jsdoc_above(lines,i):
                jsdoc = make_jsdoc_for_function(trimmed)
                out.append(jsdoc)
                changed=True
        out.append(line)
    if changed:
        with open(file,'w',encoding='utf-8') as f:
            f.write('\n'.join(out)+('\n' if raw.endswith('\n') else ''))
        print('Updated',file)


def main():
    if len(sys.argv) < 2:
        print('Usage: python add-jsdoc.py <dir> [dir2]')
        sys.exit(1)
    for d in sys.argv[1:]:
        if not os.path.exists(d):
            print('Path not found',d)
            continue
        files = walk(d)
        for f in files:
            process_file(f)

if __name__=='__main__':
    main()
