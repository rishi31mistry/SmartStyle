import FootwearBrandPage from './FootwearBrandPage'

export default function SkechersFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="Skechers"
      title="Skechers Women's Footwear"
      categoryNames={['Sports Shoes', 'Sneakers', 'Flip Flops']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
