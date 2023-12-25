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
