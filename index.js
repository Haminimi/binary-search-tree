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
