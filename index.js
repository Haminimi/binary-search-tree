class Node {
	constructor(data = null, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(array) {
		this.root = buildTree(mergeSort(removeDuplicates(array)));
	}

	insert(data, currentNode = this.root) {
		if (!this.root) {
			this.root = new Node(data);
		} else {
			if (data > currentNode.data) {
				if (currentNode.right === null) {
					currentNode.right = new Node(data);
					console.log(`Inserted: ${currentNode.right.data}`);
					return;
				} else {
					this.insert(data, currentNode.right);
				}
			}

			if (data < currentNode.data) {
				if (currentNode.left === null) {
					currentNode.left = new Node(data);
					console.log(`Inserted: ${currentNode.left.data}`);
					return;
				} else {
					this.insert(data, currentNode.left);
				}
			}
		}
	}

	delete(data, currentNode = this.root, prevNode) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			if (data === currentNode.data) {
				if (!prevNode) {
					let current = this.root.left;
					while (current.right) {
						current = current.right;
					}
					current.right = this.root.right;
					this.root = this.root.left;
				} else {
					let parentNode;
					if (data > prevNode.data) {
						parentNode = prevNode.right;
					} else {
						parentNode = prevNode.left;
					}
					if (
						currentNode.right === null &&
						currentNode.left === null
					) {
						parentNode = null;
					} else if (currentNode.right === null) {
						parentNode = currentNode.left;
					} else if (currentNode.left === null) {
						parentNode = currentNode.right;
					} else if (currentNode.left.data < currentNode.right.data) {
						if (currentNode.left.right !== null) {
							let lastRightNode = currentNode.left.right;
							while (lastRightNode.right) {
								lastRightNode = lastRightNode.right;
							}
							lastRightNode.right = currentNode.right;
						} else {
							currentNode.left.right = currentNode.right;
						}
						parentNode = currentNode.left;
					} else {
						if (currentNode.right.right !== null) {
							currentNode.right.right.right = currentNode.left;
						} else {
							currentNode.right.right = currentNode.left;
						}
						parentNode = currentNode.right;
					}

					if (data > prevNode.data) {
						prevNode.right = parentNode;
					} else {
						prevNode.left = parentNode;
					}

					return;
				}
			} else if (data > currentNode.data) {
				this.delete(data, currentNode.right, currentNode);
			} else {
				this.delete(data, currentNode.left, currentNode);
			}
		}
	}

	find(value) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			let current = this.root;
			while (current) {
				if (current.data === value) {
					console.log(current);
					return current;
				} else if (value > current.data) {
					current = current.right;
				} else {
					current = current.left;
				}
			}
		}
	}

	levelOrder(callback) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			if (!callback) {
				let queue = [];
				queue.push(this.root);
				let current;
				let resultArray = [];

				while (queue.length > 0) {
					current = queue[0];
					resultArray.push(current.data);
					if (current.left !== null) {
						queue.push(current.left);
					}
					if (current.right !== null) {
						queue.push(current.right);
					}
					queue.shift();
				}

				console.log(`Level order: ${resultArray}`);
				return resultArray;
			} else {
				let queue = [];
				queue.push(this.root);
				let current;

				while (queue.length > 0) {
					current = queue[0];
					callback(current.data);
					if (current.left !== null) {
						queue.push(current.left);
					}
					if (current.right !== null) {
						queue.push(current.right);
					}
					queue.shift();
				}
			}
		}
	}

	levelOrderRecursive(
		callback,
		queue = [this.root],
		current,
		resultArray = []
	) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			if (!callback) {
				if (queue.length === 0) {
					console.log(resultArray);
					return resultArray;
				} else {
					current = queue[0];
					resultArray.push(current.data);

					if (current.left !== null) {
						queue.push(current.left);
					}
					if (current.right !== null) {
						queue.push(current.right);
					}
					queue.shift();
					return this.levelOrderRecursive(
						callback,
						queue,
						current,
						resultArray
					);
				}
			} else {
				if (queue.length === 0) {
					return;
				} else {
					current = queue[0];
					callback(current.data);

					if (current.left !== null) {
						queue.push(current.left);
					}
					if (current.right !== null) {
						queue.push(current.right);
					}
					queue.shift();
					return this.levelOrderRecursive(
						callback,
						queue,
						current,
						resultArray
					);
				}
			}
		}
	}

	preOrder(callback, current = this.root, resultArray = []) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			if (!callback) {
				if (current === null) {
					return resultArray;
				} else {
					resultArray.push(current.data);
					this.preOrder(callback, current.left, resultArray);
					this.preOrder(callback, current.right, resultArray);

					return resultArray;
				}
			} else {
				if (current === null) {
					return;
				} else {
					callback(current.data);
					this.preOrder(callback, current.left);
					this.preOrder(callback, current.right);

					return;
				}
			}
		}
	}

	inOrder(callback, current = this.root, resultArray = []) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			if (!callback) {
				if (current === null) {
					return resultArray;
				} else {
					this.inOrder(callback, current.left, resultArray);
					resultArray.push(current.data);
					this.inOrder(callback, current.right, resultArray);

					return resultArray;
				}
			} else {
				if (current === null) {
					return;
				} else {
					this.inOrder(callback, current.left);
					callback(current.data);
					this.inOrder(callback, current.right);

					return;
				}
			}
		}
	}

	postOrder(callback, current = this.root, resultArray = []) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			if (!callback) {
				if (current === null) {
					return resultArray;
				} else {
					this.postOrder(callback, current.left, resultArray);
					this.postOrder(callback, current.right, resultArray);
					resultArray.push(current.data);

					return resultArray;
				}
			} else {
				if (current === null) {
					return;
				} else {
					this.postOrder(callback, current.left);
					this.postOrder(callback, current.right);
					callback(current.data);

					return;
				}
			}
		}
	}

	height(node = this.root) {
		if (!this.root) {
			console.log('The tree is empty');
		} else {
			let currentNode = node;
			let sumRightTree = 1;
			let sumLeftTree = 1;
			while (currentNode) {
				currentNode = currentNode.right;
				sumRightTree += 1;
			}

			currentNode = node;

			while (currentNode) {
				currentNode = currentNode.left;
				sumLeftTree += 1;
			}

			const result = Math.max(sumLeftTree, sumRightTree);
			console.log(`Height: ${result}`);
			return result;
		}
	}
}

function buildTree(array, start = 0, end = array.length - 1) {
	if (start > end) {
		return null;
	} else {
		const halfIndex = Math.floor((start + end) / 2);

		const root = new Node(array[halfIndex]);
		root.left = buildTree(array, start, halfIndex - 1);
		root.right = buildTree(array, halfIndex + 1, end);

		return root;
	}
}

function mergeSort(array) {
	if (array.length === 1) {
		return array;
	} else {
		const halfIndex = Math.floor(array.length / 2);

		const leftPart = array.slice(0, halfIndex);
		const rightPart = array.slice(halfIndex);

		const leftResult = mergeSort(leftPart);
		const rightResult = mergeSort(rightPart);

		return merge(leftResult, rightResult);
	}
}

function merge(leftPart, rightPart) {
	let i = 0;
	let j = 0;
	let resultArray = [];

	while (i < leftPart.length && j < rightPart.length) {
		if (leftPart[i] < rightPart[j]) {
			resultArray.push(leftPart[i]);
			i++;
		} else if (rightPart[j] < leftPart[i]) {
			resultArray.push(rightPart[j]);
			j++;
		}
	}

	while (i < leftPart.length) {
		resultArray.push(leftPart[i]);
		i++;
	}

	while (j < rightPart.length) {
		resultArray.push(rightPart[j]);
		j++;
	}

	return resultArray;
}
