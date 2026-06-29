import dogFoodImg from '../assets/images/Pet_food/Dog_food.png'

import naturalImg from '../assets/images/Jerkeis/Dogs/Natural/Natural Animation.png'
import bananaImg from '../assets/images/Jerkeis/Dogs/Banana/Banana Animation.png'
import blueberryImg from '../assets/images/Jerkeis/Dogs/BlueBerry/BlueBerry Animation.png'
import milkImg from '../assets/images/Jerkeis/Dogs/Milk/Milk Animation.png'
import orangeImg from '../assets/images/Jerkeis/Dogs/Orange/Orange Animation.png'
import spinachImg from '../assets/images/Jerkeis/Dogs/Spinach/Spinach Animation.png'

import naturalFront from '../assets/images/Jerkeis/Dogs/Natural/Natural F.png'
import naturalBack from '../assets/images/Jerkeis/Dogs/Natural/Natural B.png'
import naturalStick from '../assets/images/Jerkeis/Dogs/Natural/Natural Single.png'
import naturalProduct from '../assets/images/Jerkeis/Dogs/Natural/Natural Bunch.png'

import bananaFront from '../assets/images/Jerkeis/Dogs/Banana/Banana F.png'
import bananaBack from '../assets/images/Jerkeis/Dogs/Banana/Banana B.png'
import bananaStick from '../assets/images/Jerkeis/Dogs/Banana/Banana Single.png'
import bananaProduct from '../assets/images/Jerkeis/Dogs/Banana/Banana bunch.png'

import blueberryFront from '../assets/images/Jerkeis/Dogs/BlueBerry/BlueBerry F.png'
import blueberryBack from '../assets/images/Jerkeis/Dogs/BlueBerry/BlueBerry B.png'
import blueberryStick from '../assets/images/Jerkeis/Dogs/BlueBerry/BlueBerry Single.png'
import blueberryProduct from '../assets/images/Jerkeis/Dogs/BlueBerry/Blueberry Bunch.png'

import milkFront from '../assets/images/Jerkeis/Dogs/Milk/Milk F.png'
import milkBack from '../assets/images/Jerkeis/Dogs/Milk/Milk B.png'
import milkStick from '../assets/images/Jerkeis/Dogs/Milk/Milk Single.png'
import milkProduct from '../assets/images/Jerkeis/Dogs/Milk/Milk bunch.png'

import orangeFront from '../assets/images/Jerkeis/Dogs/Orange/Orange F.png'
import orangeBack from '../assets/images/Jerkeis/Dogs/Orange/Orange B.png'
import orangeStick from '../assets/images/Jerkeis/Dogs/Orange/Orange Single.png'
import orangeProduct from '../assets/images/Jerkeis/Dogs/Orange/Orange Bunch.png'

import spinachFront from '../assets/images/Jerkeis/Dogs/Spinach/Spinach F.png'
import spinachBack from '../assets/images/Jerkeis/Dogs/Spinach/Spinach B.png'
import spinachStick from '../assets/images/Jerkeis/Dogs/Spinach/Spinach SIngle.png'
import spinachProduct from '../assets/images/Jerkeis/Dogs/Spinach/Spinach Bunch.png'

export const dogProducts = [
  { 
    id: 1, 
    name: 'Pure & Simple Natural Dental Sticks', 
    desc: 'Pure, simple, and irresistibly meaty. JERKEIS Natural Dental Sticks focus on the core savory flavor of real chicken liver that dogs naturally love. Shaped into a realistic, straight cylinder to promote thorough chewing, these treats mechanically clean teeth while delivering essential nutrients. A perfect grain-free daily reward for pet parents who prefer a classic, unflavored nutritional profile.', 
    img: naturalFront,
    images: [naturalFront, naturalBack, naturalStick, naturalProduct, naturalImg],
    price: '₹1500.00',
    unit: '100g',
    rating: 4.8,
    reviews: 120,
    brand: 'JERKEIS',
    features: [
      'ADVANCED ORAL CARE: Fortified with Di-calcium Phosphate and SHMP to actively control plaque, reduce tartar buildup, and lock in long-lasting fresh breath.',
      'NATURAL & GRAIN-FREE: Expertly crafted with tapioca and potato starch for a wholesome, highly digestible chew that is gentle on your dog\'s stomach.',
      'ENERGY & VITALITY: Enriched with a comprehensive Vitamin B-Complex and real chicken liver to support a healthy metabolism, muscle strength, and active daily life.',
      'HOLISTIC WELLNESS: Designed to promote digestive health, robust immunity, heart health, and help maintain a healthy weight.'
    ],
    ingredients: 'Real chicken liver, Tapioca & Potato starch, Milk Powder, Sucrose, Vegetable-derived Glycerine, Di-calcium Phosphate, Xanthan Gum, Vitamin B-Complex (B1, B2, B6, B9, B12), Vitamin E, Vitamin K, Vitamin D3, Omega 3, Zinc, Iron, Riboflavin, Potassium Sorbate, Sodium Hexametaphosphate, Mineral Water, Table Salt.',
    nutritionalFacts: ['Protein: 12.25%', 'Fat: 0.54%', 'Calcium: 7.21%', 'Carbohydrates: 73.34%', 'Energy: 337.18 kcal', 'Salt: 0.73%', 'Fiber: 0.12%'],
    feedingGuide: ['Small Dogs (5-10Kg): 1-2 Sticks', 'Medium Dogs (10-25Kg): 2-3 Sticks', 'Large Dogs (25-50Kg): 3-4 Sticks', 'Always supervise your dog during chewing and provide fresh water. Store in a cool & dry place.']
  },
  { 
    id: 2, 
    name: 'Premium Banana Dental Sticks', 
    desc: 'Sweet, wholesome, and highly digestible, JERKEIS Banana Dental Sticks offer a delicious twist on canine oral care. Blending natural banana powder with savory real chicken liver, these straight, cylindrical dental chews provide an extended chewing experience. Free from grains and harsh chemicals, they are the perfect daily treat to maintain your dog\'s dental hygiene and overall health.', 
    img: bananaFront,
    images: [bananaFront, bananaBack, bananaStick, bananaProduct, bananaImg],
    price: '₹850.00',
    unit: '100g',
    rating: 4.5,
    reviews: 340,
    brand: 'JERKEIS',
    features: [
      'ADVANCED ORAL CARE: Fortified with Di-calcium Phosphate and SHMP to actively control plaque, reduce tartar buildup, and lock in long-lasting fresh breath.',
      'NATURAL & GRAIN-FREE: Expertly crafted with tapioca and potato starch for a wholesome, highly digestible chew that is gentle on your dog\'s stomach.',
      'ENERGY & VITALITY: Enriched with a comprehensive Vitamin B-Complex and real chicken liver to support a healthy metabolism, muscle strength, and active daily life.',
      'HOLISTIC WELLNESS: Designed to promote digestive health, robust immunity, heart health, and help maintain a healthy weight.'
    ],
    ingredients: 'Real chicken liver, Tapioca & Potato starch, Milk Powder, Sucrose, Vegetable-derived Glycerine, Di-calcium Phosphate, Xanthan Gum, Vitamin B-Complex (B1, B2, B6, B9, B12), Vitamin E, Vitamin K, Vitamin D3, Omega 3, Zinc, Iron, Riboflavin, Potassium Sorbate, Sodium Hexametaphosphate, Mineral Water, Table Salt.',
    nutritionalFacts: ['Protein: 12.25%', 'Fat: 0.54%', 'Calcium: 7.21%', 'Carbohydrates: 73.34%', 'Energy: 337.18 kcal', 'Salt: 0.73%', 'Fiber: 0.12%'],
    feedingGuide: ['Small Dogs (5-10Kg): 1-2 Sticks', 'Medium Dogs (10-25Kg): 2-3 Sticks', 'Large Dogs (25-50Kg): 3-4 Sticks', 'Always supervise your dog during chewing and provide fresh water. Store in a cool & dry place.']
  },
  { 
    id: 3, 
    name: 'Antioxidant-Rich Blueberry Dental Sticks', 
    desc: 'Antioxidant-rich and incredibly flavorful, JERKEIS Blueberry Dental Sticks make dental hygiene a treat your dog will crave. Featuring natural blueberry powder paired with real chicken liver, these straight, cylindrical dental sticks are engineered for a satisfying chew. The grain-free, chemically safe recipe ensures you are feeding your pet nothing but wholesome, functional nutrition.', 
    img: blueberryFront,
    images: [blueberryFront, blueberryBack, blueberryStick, blueberryProduct, blueberryImg],
    price: '₹1200.00',
    unit: '100g',
    rating: 4.8,
    reviews: 512,
    brand: 'JERKEIS',
    features: [
      'ADVANCED ORAL CARE: Fortified with Di-calcium Phosphate and SHMP to actively control plaque, reduce tartar buildup, and lock in long-lasting fresh breath.',
      'NATURAL & GRAIN-FREE: Expertly crafted with tapioca and potato starch for a wholesome, highly digestible chew that is gentle on your dog\'s stomach.',
      'ENERGY & VITALITY: Enriched with a comprehensive Vitamin B-Complex and real chicken liver to support a healthy metabolism, muscle strength, and active daily life.',
      'HOLISTIC WELLNESS: Designed to promote digestive health, robust immunity, heart health, and help maintain a healthy weight.'
    ],
    ingredients: 'Real chicken liver, Tapioca & Potato starch, Milk Powder, Sucrose, Vegetable-derived Glycerine, Di-calcium Phosphate, Xanthan Gum, Vitamin B-Complex (B1, B2, B6, B9, B12), Vitamin E, Vitamin K, Vitamin D3, Omega 3, Zinc, Iron, Riboflavin, Potassium Sorbate, Sodium Hexametaphosphate, Mineral Water, Table Salt.',
    nutritionalFacts: ['Protein: 12.25%', 'Fat: 0.54%', 'Calcium: 7.21%', 'Carbohydrates: 73.34%', 'Energy: 337.18 kcal', 'Salt: 0.73%', 'Fiber: 0.12%'],
    feedingGuide: ['Small Dogs (5-10Kg): 1-2 Sticks', 'Medium Dogs (10-25Kg): 2-3 Sticks', 'Large Dogs (25-50Kg): 3-4 Sticks', 'Always supervise your dog during chewing and provide fresh water. Store in a cool & dry place.']
  },
  { 
    id: 4, 
    name: 'Calcium-Rich Milk Dental Sticks', 
    desc: 'Creamy, comforting, and highly nutritious, JERKEIS Milk Dental Sticks are a gentle yet effective way to maintain your dog\'s oral hygiene. Fortified with premium milk powder and real chicken liver, these straight, cylindrical chews offer a rich flavor profile. The grain-free, easily digestible formula is packed with calcium and vitamins to support strong teeth and everyday vitality.', 
    img: milkFront,
    images: [milkFront, milkBack, milkStick, milkProduct, milkImg],
    price: '₹270.00',
    unit: '100g',
    rating: 4.4,
    reviews: 1908,
    brand: 'JERKEIS',
    features: [
      'ADVANCED ORAL CARE: Fortified with Di-calcium Phosphate and SHMP to actively control plaque, reduce tartar buildup, and lock in long-lasting fresh breath.',
      'NATURAL & GRAIN-FREE: Expertly crafted with tapioca and potato starch for a wholesome, highly digestible chew that is gentle on your dog\'s stomach.',
      'ENERGY & VITALITY: Enriched with a comprehensive Vitamin B-Complex and real chicken liver to support a healthy metabolism, muscle strength, and active daily life.',
      'HOLISTIC WELLNESS: Designed to promote digestive health, robust immunity, heart health, and help maintain a healthy weight.'
    ],
    ingredients: 'Milk Powder, Real chicken liver, Tapioca & Potato starch, Sucrose, Vegetable-derived Glycerine, Di-calcium Phosphate, Xanthan Gum, Vitamin B-Complex (B1, B2, B6, B9, B12), Vitamin E, Vitamin K, Vitamin D3, Omega 3, Zinc, Iron, Riboflavin, Potassium Sorbate, Sodium Hexametaphosphate, Mineral Water, Table Salt.',
    nutritionalFacts: ['Protein: 12.25%', 'Fat: 0.54%', 'Calcium: 7.21%', 'Carbohydrates: 73.34%', 'Energy: 337.18 kcal', 'Salt: 0.73%', 'Fiber: 0.12%'],
    feedingGuide: ['Small Dogs (5-10Kg): 1-2 Sticks', 'Medium Dogs (10-25Kg): 2-3 Sticks', 'Large Dogs (25-50Kg): 3-4 Sticks', 'Always supervise your dog during chewing and provide fresh water. Store in a cool & dry place.']
  },
  { 
    id: 5, 
    name: 'Breath-Freshening Orange Dental Sticks', 
    desc: 'Give your dog a zesty, nutrient-packed reward that works as hard as they play. JERKEIS Orange Dental Sticks combine the rich taste of real chicken liver with natural orange powder. Formed into a realistic, straight cylindrical shape to maximize chewing engagement, these premium, grain-free treats actively clean teeth while delivering a powerful boost of essential vitamins for daily vitality.', 
    img: orangeFront,
    images: [orangeFront, orangeBack, orangeStick, orangeProduct, orangeImg],
    price: '₹950.00',
    unit: '100g',
    rating: 4.3,
    reviews: 215,
    brand: 'JERKEIS',
    features: [
      'ADVANCED ORAL CARE: Fortified with Di-calcium Phosphate and SHMP to actively control plaque, reduce tartar buildup, and lock in long-lasting fresh breath.',
      'NATURAL & GRAIN-FREE: Expertly crafted with tapioca and potato starch for a wholesome, highly digestible chew that is gentle on your dog\'s stomach.',
      'ENERGY & VITALITY: Enriched with a comprehensive Vitamin B-Complex and real chicken liver to support a healthy metabolism, muscle strength, and active daily life.',
      'HOLISTIC WELLNESS: Designed to promote digestive health, robust immunity, heart health, and help maintain a healthy weight.'
    ],
    ingredients: 'Real chicken liver, Tapioca & Potato starch, Milk Powder, Sucrose, Vegetable-derived Glycerine, Di-calcium Phosphate, Xanthan Gum, Vitamin B-Complex (B1, B2, B6, B9, B12), Vitamin E, Vitamin K, Vitamin D3, Omega 3, Zinc, Iron, Riboflavin, Potassium Sorbate, Sodium Hexametaphosphate, Mineral Water, Table Salt.',
    nutritionalFacts: ['Protein: 12.25%', 'Fat: 0.54%', 'Calcium: 7.21%', 'Carbohydrates: 73.34%', 'Energy: 337.18 kcal', 'Salt: 0.73%', 'Fiber: 0.12%'],
    feedingGuide: ['Small Dogs (5-10Kg): 1-2 Sticks', 'Medium Dogs (10-25Kg): 2-3 Sticks', 'Large Dogs (25-50Kg): 3-4 Sticks', 'Always supervise your dog during chewing and provide fresh water. Store in a cool & dry place.']
  },
  { 
    id: 6, 
    name: 'Nutrient-Rich Spinach Dental Sticks', 
    desc: 'Packed with green goodness, JERKEIS Spinach Dental Sticks are the ultimate super-treat for your dog\'s oral care routine. Infused with natural spinach powder and real chicken liver, these straight, cylindrical chews encourage healthy chewing habits. The grain-free formula ensures easy digestion while powerful active ingredients work to keep your dog\'s teeth sparkling and breath fresh.', 
    img: spinachFront,
    images: [spinachFront, spinachBack, spinachStick, spinachProduct, spinachImg],
    price: '₹320.00',
    unit: '100g',
    rating: 4.6,
    reviews: 843,
    brand: 'JERKEIS',
    features: [
      'ADVANCED ORAL CARE: Fortified with Di-calcium Phosphate and SHMP to actively control plaque, reduce tartar buildup, and lock in long-lasting fresh breath.',
      'NATURAL & GRAIN-FREE: Expertly crafted with tapioca and potato starch for a wholesome, highly digestible chew that is gentle on your dog\'s stomach.',
      'ENERGY & VITALITY: Enriched with a comprehensive Vitamin B-Complex and real chicken liver to support a healthy metabolism, muscle strength, and active daily life.',
      'HOLISTIC WELLNESS: Designed to promote digestive health, robust immunity, heart health, and help maintain a healthy weight.'
    ],
    ingredients: 'Real chicken liver, Tapioca & Potato starch, Milk Powder, Sucrose, Vegetable-derived Glycerine, Di-calcium Phosphate, Xanthan Gum, Vitamin B-Complex (B1, B2, B6, B9, B12), Vitamin E, Vitamin K, Vitamin D3, Omega 3, Zinc, Iron, Riboflavin, Potassium Sorbate, Sodium Hexametaphosphate, Mineral Water, Table Salt.',
    nutritionalFacts: ['Protein: 12.25%', 'Fat: 0.54%', 'Calcium: 7.21%', 'Carbohydrates: 73.34%', 'Energy: 337.18 kcal', 'Salt: 0.73%', 'Fiber: 0.12%'],
    feedingGuide: ['Small Dogs (5-10Kg): 1-2 Sticks', 'Medium Dogs (10-25Kg): 2-3 Sticks', 'Large Dogs (25-50Kg): 3-4 Sticks', 'Always supervise your dog during chewing and provide fresh water. Store in a cool & dry place.']
  },
]

import chickenFront from '../assets/images/Jerkeis/Cats/Gravy/Gravy F.png'
import chickenBack from '../assets/images/Jerkeis/Cats/Gravy/Gravy B.png'
import chickenProduct from '../assets/images/Jerkeis/Cats/Gravy/Gravy Full.png'

import tunaFront from '../assets/images/Jerkeis/Cats/Creamy/Creamy F.png'
import tunaBack from '../assets/images/Jerkeis/Cats/Creamy/Creamy B.png'
import tunaProduct from '../assets/images/Jerkeis/Cats/Creamy/Creamy Full.png'

export const catProducts = [
  { 
    id: 7, 
    name: 'Real Chicken Gravy Treat', 
    desc: 'Elevate your cat\'s everyday diet with the deeply satisfying flavor of the JERKEIS Real Chicken Gravy Treat. This wholesome recipe features hearty, bite-sized chunks bathed in a luscious, savory gravy that cats naturally crave. Made with high-quality real chicken, it delivers premium protein for muscle support alongside essential moisture for optimal urinary tract health. Completely grain-free and crafted without any artificial colors or preservatives, it is a healthy, mouthwatering reward designed for overall vitality.', 
    img: chickenFront,
    images: [chickenFront, chickenBack, chickenProduct],
    price: '₹450.00',
    unit: '70g',
    rating: 4.7,
    reviews: 320,
    brand: 'JERKEIS',
    features: [
      'HYDRATION SUPPORT: Delivers essential daily moisture to proactively support healthy kidney and urinary tract function.',
      'RICH IN PREMIUM PROTEIN: Packed with real meat that provides high-quality amino acids for strong, lean muscles.',
      'GENTLE ON DIGESTION: Formulated 100% grain-free and chemical-free, ensuring easy digestion even for cats with sensitive stomachs.',
      'PURE & NATURAL: Wholesome, clean nutrition made with absolutely zero artificial colors, flavors, or harmful preservatives.'
    ],
    ingredients: 'Chicken and Animal Derivatives, Binder, Fish Derivative, Enhancers, Minerals, Thickener, Oil, Vitamins, Cassava flour, Vit B1, B2, B6, B12, Zinc, Vitamin E, Antioxidants.',
    nutritionalFacts: ['Crude Protein: 9.0%', 'Crude Fat: 1.5%', 'Crude Fiber: 1.0%', 'Moisture: 86.0%', 'Ash: 2.0%'],
    feedingGuide: ['Designed as a premium, grain-free supplement to complement a complete and balanced diet.', 'Ensure your cat has continuous access to fresh, clean drinking water.', 'Adjust daily portions in accordance with your cat\'s specific body weight and caloric requirements.', 'Offer as an independent reward or dispense over dry kibble to enhance meal palatability.']
  },
  { 
    id: 8, 
    name: 'Tuna Fish Creamy Treat', 
    desc: 'Treat your feline friend to a luxurious culinary experience with the JERKEIS Tuna Fish Creamy Treat. This smooth, delightful mousse offers the irresistible taste of premium fish while providing a vital source of daily moisture to keep your cat hydrated. Crafted with a 100% grain-free and chemical-free recipe, this pure, natural puree is exceptionally gentle on sensitive stomachs. Serve it directly as a bonding reward or dispense it over dry kibble to instantly elevate mealtime palatability.', 
    img: tunaFront,
    images: [tunaFront, tunaBack, tunaProduct],
    price: '₹480.00',
    unit: '70g',
    rating: 4.8,
    reviews: 450,
    brand: 'JERKEIS',
    features: [
      'HYDRATION SUPPORT: Delivers essential daily moisture to proactively support healthy kidney and urinary tract function.',
      'RICH IN PREMIUM PROTEIN: Packed with real meat that provides high-quality amino acids for strong, lean muscles.',
      'GENTLE ON DIGESTION: Formulated 100% grain-free and chemical-free, ensuring easy digestion even for cats with sensitive stomachs.',
      'PURE & NATURAL: Wholesome, clean nutrition made with absolutely zero artificial colors, flavors, or harmful preservatives.'
    ],
    ingredients: 'Fish and Animal Derivatives, Binder, Fish Derivative, Enhancers, Minerals, Thickener, Oil, Vitamins, Cassava flour, Vit B1, B2, B6, B12, Zinc, Vitamin E, Antioxidants.',
    nutritionalFacts: ['Crude Protein: 9.0%', 'Crude Fat: 1.5%', 'Crude Fiber: 1.0%', 'Moisture: 86.0%', 'Ash: 2.0%'],
    feedingGuide: ['Designed as a premium, grain-free supplement to complement a complete and balanced diet.', 'Ensure your cat has continuous access to fresh, clean drinking water.', 'Adjust daily portions in accordance with your cat\'s specific body weight and caloric requirements.', 'Offer as an independent reward or dispense over dry kibble to enhance meal palatability.']
  }
]
