import React from 'react'
import images from '../assets/img/img-index'

const {
  img: {
    logos: {
      RedLogo,
      BlueLogo,
      ColosseumLogo,
      CrystalLogo,
      DiamondLogo,
      EmeraldLogo,
      FireredLogo,
      GoldLogo,
      HeartgoldLogo,
      LeafgreenLogo,
      PearlLogo,
      PlatinumLogo,
      RubyLogo,
      SapphireLogo,
      SilverLogo,
      SoulsilverLogo,
      XLogo,
      XDLogo,
      YLogo,
      WhiteLogo,
      BlackLogo,
      YellowLogo,
    },
  },
} = images

export const getLogo = (key) =>
  key === 'red'
    ? RedLogo
    : key === 'blue'
    ? BlueLogo
    : key === 'colosseum'
    ? ColosseumLogo
    : key === 'crystal'
    ? CrystalLogo
    : key === 'diamond'
    ? DiamondLogo
    : key === 'emerald'
    ? EmeraldLogo
    : key === 'firered'
    ? FireredLogo
    : key === 'gold'
    ? GoldLogo
    : key === 'heartgold'
    ? HeartgoldLogo
    : key === 'leafgreen'
    ? LeafgreenLogo
    : key === 'pearl'
    ? PearlLogo
    : key === 'platinum'
    ? PlatinumLogo
    : key === 'ruby'
    ? RubyLogo
    : key === 'sapphire'
    ? SapphireLogo
    : key === 'silver'
    ? SilverLogo
    : key === 'soulsilver'
    ? SoulsilverLogo
    : key === 'x'
    ? XLogo
    : key === 'xd'
    ? XDLogo
    : key === 'y'
    ? YLogo
    : key === 'yellow'
    ? YellowLogo
    : key === 'black'
    ? BlackLogo
    : key === 'white'
    ? WhiteLogo
    : 'red'

export default getLogo
