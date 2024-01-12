const formatCurrency = (current: number): string => {
  // return current.toLocaleString('pt-br', {
  //   style: 'currency',
  //   currency: 'BRL',
  // });
  return current.toString() + " KWh";
};
export default formatCurrency;
