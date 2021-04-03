interface ObjectConstructor {
	assign(target: any, ...sources: any[]): any;
}

if (typeof Object.assign !== 'function') {
	Object.defineProperty(Object.prototype, 'assign', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function(target: Object, ...args: Object[]): any {

			if (!target) {
				throw TypeError('Cannot convert undefined or null to object');
			}
			for (const source of args) {
				if (source) {
					Object.keys(source)
						.forEach((key: string) => (<any>target)[key] = (<any>source)[key]);
				}
			}
			return target;
		}
	});
}
