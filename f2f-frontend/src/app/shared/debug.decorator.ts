// tslint:disable-next-line:typedef
export function Debugger(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  // Again, cache the original method for later use
  const originalMethod = descriptor.value;
  // we write a new implementation for the method
  descriptor.value = async function(...args) {
    const proto = Object.getPrototypeOf(args[1]);
    console.log(`%c${proto.constructor.type}`, 'color:green; font-size:16px;');
    // we run the original method with the original arguments
    const result = originalMethod.apply(this, args);

    // and return the result
    return result;
  };
  return descriptor;
}
