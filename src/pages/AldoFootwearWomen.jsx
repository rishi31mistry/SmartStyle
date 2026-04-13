import FootwearBrandPage from './FootwearBrandPage'

export default function AldoFootwearWomen() {
  return (
    <FootwearBrandPage
      brand="Aldo"
      title="Aldo Women's Footwear"
      categoryNames={['Heels', 'Flats', 'Loafers']}
      subGender="Women"
      wrapperClass="wrapper_women"
      activeColor="#E91E8C"
    />
  )
}
