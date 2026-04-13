import FootwearBrandPage from './FootwearBrandPage'

export default function PumaFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="Puma"
      title="Puma Women's Footwear"
      categoryNames={['Sports Shoes', 'Flip Flops', 'Sneakers']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
