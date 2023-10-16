export const state = () => ({
	carts: []
})

export const mutations = {
	CHECKOUT_CART(state, products) {
		console.log(products)
		state.carts = products
	}
}

export const actions = {
	checkoutCart({ commit }, products) {
		console.log(products)
		commit('CHECKOUT_CART', products)
	}
}
