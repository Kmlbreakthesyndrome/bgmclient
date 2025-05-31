import React from 'react';
import { Link } from 'react-router-dom';
import serumImg from "../../assets/images/serum.jpg";
import lipstickImg from "../../assets/images/lipstick.jpg";
import creamImg from "../../assets/images/cream.jpg";
import paletteImg from "../../assets/images/palette.jpg";
import rollerImg from "../../assets/images/roller.jpg";
import pillowImg from "../../assets/images/pillow.jpg";

export default function LuxuryBeautyCards() {
  const products = [
    {
      name: 'Diamond Glow Serum',
      image: serumImg,
      brandName: 'Lumière',
      description: '24K gold-infused serum for radiant, youthful skin with diamond powder complex.',
    },
    {
      name: 'Velvet Luxe Lipstick',
      image: lipstickImg,
      brandName: 'Belle Époque',
      description: 'Ultra-pigmented, long-wear lipstick with a creamy, velvety finish in exclusive shades.',
    },
    {
      name: 'Black Orchid Night Cream',
      image: creamImg,
      brandName: 'Nocturne',
      description: 'Rich, indulgent night cream with rare black orchid extract for overnight rejuvenation.',
    },
    {
      name: 'Gilded Eyeshadow Palette',
      image: paletteImg,
      brandName: 'Opulence',
      description: '18 luxurious shades with pearl and metallic finishes for dazzling eye looks.',
    },
    {
      name: 'Rose Quartz Facial Roller',
      image: rollerImg,
      brandName: 'Jade Rituals',
      description: 'Hand-carved rose quartz facial roller to depuff and enhance product absorption.',
    },
    {
      name: 'Silk Pillowcase Set',
      image: pillowImg,
      brandName: 'Soie de Rêve',
      description: 'Pure mulberry silk pillowcases to prevent wrinkles and maintain hairstyles overnight.',
    },
  ];

  return (
    <section className="py-16 bg-black text-white bg-gradient-to-b from-black via-gray-900 to-black select-none ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="mt-12 text-5xl font-extrabold text-center mb-16 tracking-widest uppercase text-rose-500 font-serif drop-shadow-lg">
          Aura Beauty Collection
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {products.map(({ name, image, description, brandName }, index) => (
            <div
              key={index}
              
              className="w-[320px] md:w-[360px] bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border-4 border-rose-700 hover:border-rose-200 transition-all duration-300 group overflow-hidden relative select-none transform hover:shadow-rose-500/40"
            >
              <Link to={`/beautycategory/${brandName}`}>
                {/* Product Image */}
                <div className="relative overflow-hidden h-72">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-6 z-10 relative space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-rose-300 uppercase tracking-wider font-serif">
                      {name}
                    </h3>
                    <span className="text-xs text-rose-100 bg-rose-900/50 px-2 py-1 rounded-full">
                      {brandName}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm italic font-light">{description}</p>
                  
                  {/* Price and CTA */}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-rose-200 text-xl font-serif">$95 - $220</span>
                    <button className="text-xs uppercase tracking-widest text-rose-100 hover:text-white border-b border-rose-500 hover:border-rose-200 transition-colors">
                      Discover →
                    </button>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-rose-900 rounded-3xl blur-md"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}