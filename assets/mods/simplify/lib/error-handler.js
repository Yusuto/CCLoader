export default class ErrorHandler {
	
	constructor() {
		this.fileStack = [];
		this.currentFile = null;
	}
	
	
	addFile(path) {
		const fileInfo = {
			path,
			stack: []
		};
		this.currentFile = fileInfo;
		this.fileStack.push(fileInfo);
	}
	removeLastFile() {
		const lastFile = this.fileStack.pop();
		this.currentFile = this.fileStack[this.fileStack.length - 1];
		return lastFile;
	}
	
	addStep(index, name = "") {
		this.currentFile.stack.push({
			type: "Line",
			index,
			name
		});
	}
	removeLastStep() {
		return this.currentFile.stack.pop();
	}
	
	getLastStep() {
		const stack = this.currentFile.stack;
		return stack[stack.length - 1];
	}
	
	throwError(type, message) {
		this.currentFile.stack.push({
			type: "Error",
			errorType: type,
			errorMessage: message
		});
		throw this;
	}

	printFileInfo(file) {
		console.log(`File %c${file.path}`, 'red');
		let message = '';
		const stack = file.stack;
		for(let i = stack.length - 1; i >= 0; i--) {
			const step = stack[i];
			switch (step.type) {
				case 'Error':
					message += `${line.errorType}: ${line.errorMessage}\n`;
				break;
				case 'Line': {
					message += '\t\t\tat ';
					if (step.name) {
						message += `${step.name} `; 
					}
					message += `(step: ${step.index})\n`;
				}
				break;
				default:
				break;
			}
		}	
		console.log(message);	
	}
	
	print() {
		for(let fileIndex = 0; fileIndex < this.fileStack.length; fileIndex++) {
			this.printFileInfo(this.fileStack[fileIndex]);
		}
	}
}

