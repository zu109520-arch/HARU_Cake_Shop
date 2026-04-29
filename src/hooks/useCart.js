import { useState, useEffect } from "react"

export default function useCart(initialStock = 10) {

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("haru-cart")
    return saved ? JSON.parse(saved) : []
  })

  const [stock, setStock] = useState(() => {
    const saved = localStorage.getItem("haru-stock")
    return saved ? parseInt(saved) : initialStock
  })

  useEffect(() => {
    localStorage.setItem("haru-cart", JSON.stringify(cartItems))
    localStorage.setItem("haru-stock", stock.toString())
  }, [cartItems, stock])

  const addToCart = (cakeObject, finalPrice, selectedOptions = []) => {
    if (stock <= 0) return false

    setStock(prev => prev - 1)

    const optionsStr = selectedOptions.map(o => o.label).sort().join(",")

    setCartItems(prev => {
      const idx = prev.findIndex(item => {
        const itemOpt = item.selectedOptions?.map(o => o.label).sort().join(",") || ""
        return item.name === cakeObject.name && itemOpt === optionsStr
      })

      if (idx > -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }

      return [...prev, { ...cakeObject, price: finalPrice, quantity: 1, selectedOptions }]
    })

    return true
  }

  const updateQuantity = (index, delta) => {
    const item = cartItems[index]
    if (!item) return

    if (delta > 0 && stock <= 0) return "sold_out"

    const isDeleting = item.quantity + delta <= 0
    if (isDeleting) {
      setStock(prev => prev + item.quantity)
      setCartItems(prev => prev.filter((_, i) => i !== index))
      return "deleted"
    }

    setStock(prev => prev - delta)
    setCartItems(prev =>
      prev.map((it, i) => i === index ? { ...it, quantity: it.quantity + delta } : it)
    )
    return "updated"
  }

  const clearCart = () => {
    if (cartItems.length === 0) return false
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setStock(prev => prev + total)
    setCartItems([])
    return true
  }

  return { cartItems, stock, addToCart, updateQuantity, clearCart }
}
