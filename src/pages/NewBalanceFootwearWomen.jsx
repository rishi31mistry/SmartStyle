import FootwearBrandPage from './FootwearBrandPage'

export default function NewBalanceFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="New Balance"
      title="New Balance Women's Footwear"
      categoryNames={['Sports Shoes', 'Flip Flops']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
