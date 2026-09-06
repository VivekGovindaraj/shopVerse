import React, { useEffect, useMemo, useState } from 'react'
import api from '../services/api'
import { ProductSkeleton } from '../components/LoaderUI';
import ProductCard from '../components/ProductCard';
import { showError } from '../Utils/toast';




const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async() => {

    try{
      let {data} = await api.get("/product")
      setProducts(data)
      console.log(data)
    }catch(error){
      showError("Failed to laod Products")
      console.log("Error fetch products", error)
    }finally{
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
      const cats = [...new Set((products.map((product) => product.category).filter(Boolean)))]

      return ["all", ...cats]
  }, [products])

  const filteredProducts = useMemo(() => {

    let result = [...products]
    

    if(search.trim()){
      let q = search.toLowerCase();

      result = result.filter( (product) =>  {
        return(
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
        )
      })
    }

    if(category !== 'all'){
      result = result.filter( (product) => product.category === category)
    }

    switch(sortBy){
      case "price-low" :
        result.sort((a,b) => a.price - b.price)
        break;
      case "price-high":
        result.sort((a,b) => b.price - a.price)
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
    
    return result
  }, [products, search, category, sortBy])

  return (
    <>
     <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              New arrivals every week
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Discover Products You&apos;ll Love
            </h1>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              Shop the latest trends with free shipping, secure checkout, and
              hassle-free returns.
            </p>
            <a
              href="#products"
              className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition shadow-lg"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container mx-auto px-4 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Our Products</h2>
            <p className="text-slate-500 mt-1">
              {products.length} product
              {products.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 sm:w-64 px-4 py-2.5 border border-slate-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div> 
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) 
        : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No products found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) 
        
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
              filteredProducts?.map((product) => (
                <ProductCard product={product} key={product._id}/>
              ))
            }
          </div>
        )}
      </section>
    </div>
    </>
  )
}

export default Home