import type { Category, Product } from 'src/models/types'

export const categories: Category[] = [
  { id: 1, name: 'Горячие блюда' },
  { id: 2, name: 'Закуски' },
  { id: 3, name: 'Салаты' },
  { id: 4, name: 'Супы' },
  { id: 5, name: 'Десерты' },
  { id: 6, name: 'Напитки' },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Стейк из лосося',
    price: 890,
    image:
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=400',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Паста Карбонара',
    price: 590,
    image:
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=400',
    categoryId: 1,
  },
  {
    id: 3,
    name: 'Брускетта с томатами',
    price: 320,
    image:
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=400',
    categoryId: 2,
  },
  {
    id: 4,
    name: 'Цезарь с курицей',
    price: 520,
    image:
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400',
    categoryId: 3,
  },
  {
    id: 5,
    name: 'Грибной крем-суп',
    price: 390,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    categoryId: 4,
  },
  {
    id: 6,
    name: 'Чизкейк Нью-Йорк',
    price: 350,
    image:
      'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=400',
    categoryId: 5,
  },
  {
    id: 7,
    name: 'Латте',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    categoryId: 6,
  },
  {
    id: 8,
    name: 'Свежевыжатый апельсиновый сок',
    price: 280,
    image:
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400',
    categoryId: 6,
  },
]
