const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|js|tsx|jsx)$/.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

function hasJSDocAbove(lines, idx) {
  for (let i = idx - 1; i >= 0; i--) {
    const l = lines[i].trim();
    if (l === '') continue;
    return l.startsWith('/**');
  }
  return false;
}

function makeJsDocForFunction(signature) {
  // signature: e.g. "export async function foo(a: string, b: number): Promise<void> {"
  const paramsMatch = signature.match(/\(([^)]*)\)/);
  const retMatch = signature.match(/:\s*([^\s{=>]+)/);
  const params = paramsMatch ? paramsMatch[1].trim() : '';
  const paramList = params === '' ? [] : params.split(',').map(p => p.trim());
  const lines = ['/**', ' * TODO: Describe function.'];
  for (const p of paramList) {
    // try to extract name and type
    const m = p.match(/(\w+)\s*:\s*(.+)$/);
    if (m) {
      lines.push(` * @param {${m[2].replace(/\s*\|\s*/g,'|')}} ${m[1]}`);
    } else {
      const name = p.split('=')[0].trim().split(':')[0].trim();
      if (name) lines.push(` * @param {*} ${name}`);
    }
  }
  if (retMatch) {
    const r = retMatch[1];
    lines.push(` * @returns {${r.replace(/\s*\|\s*/g,'|')}}`);
  }
  lines.push(' */');
  return lines.join('\n');
}

function makeJsDocForClass() {
  return '/**\n * TODO: Describe class.\n */';
}

function processFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/);
  let changed = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    // detect exported function/class/const arrow function
    if (/^export\s+(async\s+)?function\s+\w+\s*\(/.test(trimmed) ||
        /^export\s+function\s+\w+\s*\(/.test(trimmed)) {
      if (!hasJSDocAbove(lines, i)) {
        const jsdoc = makeJsDocForFunction(trimmed);
        out.push(jsdoc);
        changed = true;
      }
    } else if (/^export\s+class\s+\w+/.test(trimmed)) {
      if (!hasJSDocAbove(lines, i)) {
        out.push(makeJsDocForClass());
        changed = true;
      }
    } else if (/^export\s+const\s+\w+\s*=\s*\(/.test(trimmed) || /^export\s+const\s+\w+\s*=\s*async\s*\(/.test(trimmed)) {
      // const foo = (a,b) =>
      if (!hasJSDocAbove(lines, i)) {
        // merge current and maybe next lines to capture params
        let sig = trimmed;
        // try to append following lines until a => or => is found
        let j = i;
        while (j < lines.length && sig.indexOf('=>') === -1 && sig.indexOf('{') === -1) {
          j++;
          if (j < lines.length) sig += ' ' + lines[j].trim();
        }
        if (!hasJSDocAbove(lines, i)) {
          const jsdoc = makeJsDocForFunction(sig);
          out.push(jsdoc);
          changed = true;
        }
      }
    } else if (/^export\s+default\s+function\s+\w+\s*\(/.test(trimmed)) {
      if (!hasJSDocAbove(lines, i)) {
        const jsdoc = makeJsDocForFunction(trimmed);
        out.push(jsdoc);
        changed = true;
      }
    }
    out.push(line);
  }
  if (changed) {
    fs.writeFileSync(file, out.join('\n'));
    console.log('Updated', file);
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node add-jsdoc.js <dir> [dir2] ...');
    process.exit(1);
  }
  for (const d of args) {
    const abs = path.resolve(d);
    if (!fs.existsSync(abs)) {
      console.error('Path not found', abs);
      continue;
    }
    const files = walk(abs, []);
    for (const f of files) {
      processFile(f);
    }
  }
}

main();
