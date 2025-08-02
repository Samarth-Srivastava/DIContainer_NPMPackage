const { container } = require('../pkg/dist/index');
const assert = require('assert');
describe('DI Container', function() {
  class Dep1 {
    constructor() { this.called = true; }
    func1() { return 'func1'; }
  }
  class Dep2 {
    constructor(dep1) { this.dep1 = dep1; }
    func2() { return 'func2'; }
  }
  it('register and resolve basic dependency', function() {
    container.register('dep1', Dep1);
    const d1 = container.resolve('dep1');
    assert.ok(d1 instanceof Dep1);
    assert.strictEqual(d1.func1(), 'func1');
  });
  it('register and resolve with dependencies', function() {
    container.register('dep1', Dep1);
    container.register('dep2', Dep2, ['dep1']);
    const d2 = container.resolve('dep2');
    assert.ok(d2 instanceof Dep2);
    assert.ok(d2.dep1 instanceof Dep1);
    assert.strictEqual(d2.func2(), 'func2');
  });
  it('singleton returns same instance', function() {
    container.registerSingleton('dep1', Dep1);
    const d1a = container.resolve('dep1');
    const d1b = container.resolve('dep1');
    assert.strictEqual(d1a, d1b);
  });
  it('transient returns new instance', function() {
    container.registerTransient('dep1', Dep1);
    const d1a = container.resolve('dep1');
    const d1b = container.resolve('dep1');
    assert.notStrictEqual(d1a, d1b);
  });
  it('throws error for missing dependency', function() {
    assert.throws(() => container.resolve('missing'), /Service not found/);
  });
});
