import FootwearBrandPage from './FootwearBrandPage'

export default function NikeFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="Nike"
      title="Nike Women's Footwear"
      categoryNames={['Sports Shoes', 'Flip Flops', 'Sneakers']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
