const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	/** @type {Node?} */
	#root = null

	root() {
		return this.#root
	}

	add(data) {
		this.#root = insert(this.#root, data)

		/**
		 * @param {Node} node
		 * @param {*} data
		 * @returns {Node}
		 */
		function insert(node, data) {
			if (!node) {
				node = new Node(data)
				return node
			}

			if (data < node.data) {
				node.left = insert(node.left, data)
				return node
			}

			if (data > node.data) {
				node.right = insert(node.right, data)
				return node
			}

			return node
		}
	}

	has(data) {
		return !!this.#search(this.#root, data)
	}

	find(data) {
		return this.#search(this.#root, data)
	}

	remove(data) {
		this.#root = removeNode(this.#root, data)

		/**
		 * @param {Node} node
		 * @param {*} data
		 * @returns {Node}
		 */
		function removeNode(node, data) {
			if (!node) {
				return null
			}

			if (data < node.data) {
				node.left = removeNode(node.left, data)
				return node
			}

			if (data > node.data) {
				node.right = removeNode(node.right, data)
				return node
			}

			if (!node.left && !node.right) {
				return null
			}
			if (!node.left && !!node.right) {
				return node.right
			}
			if (!!node.left && !node.right) {
				return node.left
			}

			let successorParent = node
			let successor = node.right
			while (successor.left) {
				successorParent = successor
				successor = successor.left
			}

			node.data = successor.data
			if (successorParent !== node) {
				successorParent.left = successor.right
			} else {
				successorParent.right = successor.right
			}

			return node
		}
	}

	min() {
		if (!this.#root) {
			return null
		}

		return findMin(this.#root).data

		/**
		 * @param {Node} node
		 * @returns {Node}
		 */
		function findMin(node) {
			if (!node.left) {
				return node
			}

			return findMin(node.left)
		}
	}

	max() {
		if (!this.#root) {
			return null
		}

		return findMax(this.#root).data

		/**
		 * @param {Node} node
		 * @returns {Node}
		 */
		function findMax(node) {
			if (!node.right) {
				return node
			}

			return findMax(node.right)
		}
	}

	/**
	 * @param {Node} node
	 * @param {*} data
	 * @return {Node | null}
	 */
	#search(node, data) {
		if (!node) {
			return null
		}

		if (data < node.data) {
			return this.#search(node.left, data)
		}

		if (data > node.data) {
			return this.#search(node.right, data)
		}

		// node.data === data
		return node
	}
}

module.exports = {
	BinarySearchTree,
}
