import FootwearBrandPage from './FootwearBrandPage'

export default function ClarksFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="Clarks"
      title="Clarks Women's Footwear"
      categoryNames={['Sandals', 'Flip Flops', 'Sneakers']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
