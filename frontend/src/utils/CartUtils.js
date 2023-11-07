export const getDecimal = (num) => {
	return Math.round((num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
	// calculate for the item price
	const num = state.cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);
	state.itemsPrice = getDecimal(num);
	// calculate for the shipping price, if item price is more than $100 then free else $10
	state.shippingPrice = getDecimal(state.itemsPrice > 100 ? 0 : 10);
	// calculate for the tax price (15% tax)
	state.taxPrice = getDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));
	// calculate for the total price
	state.totalPrice = (
		Number(state.itemsPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);
	localStorage.setItem("cart", JSON.stringify(state));

	return state;
};
