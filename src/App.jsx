import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/welcome'
import Signup from './pages/signup'
import Login from './pages/login'
import Onboarding from './pages/onboarding'
import Home from './pages/home'
import Account from './pages/account'
import Wishlist from './pages/wishlist'
import Cart from './pages/cart'

import Men from './pages/men'
import Women from './pages/women'
import Footwear from './pages/footwear'
import FootwearMen from './pages/footwearmen'
import FootwearWomen from './pages/footwearwomen'
import Accessories from './pages/accessories'

import Nike from './pages/Nike' 
import Adidas from './pages/Adidas'
import HM from './pages/HM'
import JackAndJones from './pages/JackAndJones'
import Puma from './pages/Puma'
import Levis from './pages/Levis'
import Tommy from './pages/Tommy'
import Gap from './pages/Gap'
import USPolo from './pages/USPolo'
import Wrangler from './pages/Wrangler'

import Zara from './pages/Zara'
import HMWomen from './pages/HMWomen'
import Aurelia from './pages/Aurelia'
import Libas from './pages/Libas'
import Nykaa from './pages/Nykaa'
import Biba from './pages/Biba'
import VeroModa from './pages/VeroModa'
import Shein from './pages/Shein'
import Fabindia from './pages/Fabindia'
import Only from './pages/Only'

import NikeFootwearMen from './pages/NikeFootwearMen'
import AdidasFootwearMen from './pages/AdidasFootwearMen'
import PumaFootwearMen from './pages/PumaFootwearMen'
import NewBalanceFootwearMen from './pages/NewBalanceFootwearMen'
import AsicsFootwearMen from './pages/AsicsFootwearMen'
import WoodlandFootwearMen from './pages/WoodlandFootwearMen'
import SkechersFootwearMen from './pages/SkechersFootwearMen'
import UnderArmourFootwearMen from './pages/UnderArmourFootwearMen'
import BataFootwearMen from './pages/BataFootwearMen'
import LeeCooperFootwearMen from './pages/LeeCooperFootwearMen'

import SkechersFootwearWomen from './pages/SkechersFootwearWomen'
import ClarksFootwearWomen from './pages/ClarksFootwearWomen'
import Inc5FootwearWomen from './pages/Inc5FootwearWomen'
import PumaFootwearWomen from './pages/PumaFootwearWomen'
import NikeFootwearWomen from './pages/NikeFootwearWomen'
import AldoFootwearWomen from './pages/AldoFootwearWomen'
import RociaFootwearWomen from './pages/RociaFootwearWomen'
import HushPuppiesFootwearWomen from './pages/HushPuppiesFootwearWomen'
import AdidasFootwearWomen from './pages/AdidasFootwearWomen'
import NewBalanceFootwearWomen from './pages/NewBalanceFootwearWomen'

import Categories from './pages/categories'
import NewItems from './pages/newitems'
import FlashSale from './pages/flashsale'
import MostPopular from './pages/mostpopular'
import JustForYou from './pages/justforyou'
import DealsOfDay from './pages/dealsofday'
import SummerSpecial from './pages/summerspecial'
import CommonMen from './pages/commonmen'
import CommonWomen from './pages/commonwomen'
import CommonFootwear from './pages/commonfootwear'
import CommonAccessories from './pages/commonaccessories'
import Trending from './pages/trending'
import BudgetDeals from './pages/budgetdeals'





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/products/men" element={<Men />} />
        <Route path="/products/women" element={<Women />} />
        <Route path="/products/footwear" element={<Footwear />} />
        <Route path="/products/footwear/men" element={<FootwearMen />} />
        <Route path="/products/footwear/women" element={<FootwearWomen />} />
        <Route path="/products/accessories" element={<Accessories />} />

        <Route path="/brand/nike" element={<Nike />} />
        <Route path="/brand/adidas" element={<Adidas />} />
        <Route path="/brand/hm" element={<HM />} />
        <Route path="/brand/jackandjones" element={<JackAndJones />} />
        <Route path="/brand/puma" element={<Puma />} />
        <Route path="/brand/levis" element={<Levis />} />
        <Route path="/brand/tommy" element={<Tommy />} />
        <Route path="/brand/gap" element={<Gap />} />
        <Route path="/brand/uspolo" element={<USPolo />} />
        <Route path="/brand/wrangler" element={<Wrangler />} />

        <Route path="/women/zara" element={<Zara />} />
        <Route path="/women/hm" element={<HMWomen />} />
        <Route path="/women/aurelia" element={<Aurelia />} />
        <Route path="/women/libas" element={<Libas />} />
        <Route path="/women/nykaa" element={<Nykaa />} />
        <Route path="/women/biba" element={<Biba />} />
        <Route path="/women/veromoda" element={<VeroModa />} />
        <Route path="/women/shein" element={<Shein />} />
        <Route path="/women/fabindia" element={<Fabindia />} />
        <Route path="/women/only" element={<Only />} />

        <Route path="/brand/nike-footwear-men" element={<NikeFootwearMen />} />
        <Route path="/brand/adidas-footwear-men" element={<AdidasFootwearMen />} />
        <Route path="/brand/puma-footwear-men" element={<PumaFootwearMen />} />
        <Route path="/brand/newbalance-footwear-men" element={<NewBalanceFootwearMen />} />
        <Route path="/brand/asics-footwear-men" element={<AsicsFootwearMen />} />
        <Route path="/brand/woodland-footwear-men" element={<WoodlandFootwearMen />} />
        <Route path="/brand/skechers-footwear-men" element={<SkechersFootwearMen />} />
        <Route path="/brand/underarmour-footwear-men" element={<UnderArmourFootwearMen />} />
        <Route path="/brand/bata-footwear-men" element={<BataFootwearMen />} />
        <Route path="/brand/leecooper-footwear-men" element={<LeeCooperFootwearMen />} />

        <Route path="/brand/skechers-footwear-women" element={<SkechersFootwearWomen />} />
        <Route path="/brand/clarks-footwear-women" element={<ClarksFootwearWomen />} />
        <Route path="/brand/inc5-footwear-women" element={<Inc5FootwearWomen />} />
        <Route path="/brand/puma-footwear-women" element={<PumaFootwearWomen />} />
        <Route path="/brand/nike-footwear-women" element={<NikeFootwearWomen />} />
        <Route path="/brand/aldo-footwear-women" element={<AldoFootwearWomen />} />
        <Route path="/brand/rocia-footwear-women" element={<RociaFootwearWomen />} />
        <Route path="/brand/hushpuppies-footwear-women" element={<HushPuppiesFootwearWomen />} />
        <Route path="/brand/adidas-footwear-women" element={<AdidasFootwearWomen />} />
        <Route path="/brand/newbalance-footwear-women" element={<NewBalanceFootwearWomen />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/products/new" element={<NewItems />} />
        <Route path="/products/flash-sale" element={<FlashSale />} />
        <Route path="/products/most-popular" element={<MostPopular />} />
        <Route path="/products/just-for-you" element={<JustForYou />} />
        <Route path="/products/deals" element={<DealsOfDay />} />
        <Route path="/products/summer-special" element={<SummerSpecial />} />
        <Route path="/common/men" element={<CommonMen />} />
        <Route path="/common/women" element={<CommonWomen />} />
        <Route path="/common/footwear" element={<CommonFootwear />} />
        <Route path="/common/accessories" element={<CommonAccessories />} />
        <Route path="/products/trending" element={<Trending />} />
        <Route path="/products/budget-deals" element={<BudgetDeals />} />
        







      </Routes>
    </BrowserRouter>
  )
}

export default App