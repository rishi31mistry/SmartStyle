import FootwearBrandPage from './FootwearBrandPage'

export default function AdidasFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="Adidas"
      title="Adidas Women's Footwear"
      categoryNames={['Sports Shoes', 'Flip Flops']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
