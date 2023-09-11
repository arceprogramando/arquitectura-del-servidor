const calculateTotal = (ticketItems) => ticketItems.reduce((total, item) => total + item.price * item.quantity, 0);
export default calculateTotal;
