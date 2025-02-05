import { useState } from "react";
import { useCart } from "./hooks/useCart";
import Header from "./components/Header";
import Guitar from "./components/Guitar";

function App() {
  const {
    data,
    cart,
    addToCard,
    deleteProduc,
    incrementProdutc,
    decrementProdutc,
    clearCart,
    isEmpy,
    cartTotal,
  } = useCart();

  const [search, setSearch] = useState("");

  const filteredGuitars = data.filter((guitar) =>
    guitar.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header
        cart={cart}
        incrementProdutc={incrementProdutc}
        deleteProduc={deleteProduc}
        decrementProdutc={decrementProdutc}
        clearCart={clearCart}
        isEmpy={isEmpy}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <p className="text-center text-muted">
          Explora nuestra selección de guitarras exclusivas. Filtra por nombre para encontrar la que mejor se adapte a tu estilo.
        </p>

        <div className="text-center my-4">
  <label htmlFor="guitarFilter" className="form-label">Selecciona una guitarra:</label>
  <select
    id="guitarFilter"
    className="form-control w-50 mx-auto"
    value={search}  // El valor del estado de búsqueda
    onChange={(e) => setSearch(e.target.value)}  // Actualizamos el estado al seleccionar una guitarra
  >
    <option value="">Todas las guitarras</option>  {/* Opción para ver todas las guitarras */}
    {data.map((guitar) => (
      <option key={guitar.id} value={guitar.name}>
        {guitar.name}
      </option>
    ))}
  </select>
</div>


<div className="row justify-content-center mt-5">
  {filteredGuitars.length > 0 ? (
    filteredGuitars.map((guitar) => (
      <div key={guitar.id} className="col-md-6 col-lg-4 my-4 d-flex justify-content-center">
        <div className="card shadow-sm border-0 guitar-card">
          <div className="d-flex justify-content-center">
            <img
              className="card-img-top img-fluid guitar-image"
              src={`/img/${guitar.image}.jpg`}
              alt={guitar.name}
            />
          </div>
          <div className="card-body text-center">
            <h3 className="text-black fs-5 fw-bold text-uppercase">{guitar.name}</h3>
            <p className="text-muted">{guitar.description}</p>
            <p className="fw-bold text-primary fs-4">${guitar.price}</p>
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={() => addToCard(guitar)}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-danger">No se encontraron guitarras con ese nombre.</p>
  )}
</div>



      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
