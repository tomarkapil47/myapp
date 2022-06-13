

const App = () => {
    const [products, setProducts] = React.useState([])
    const [form, setForm] = React.useState({
        name: "",
        email: ""

    })
    React.useEffect(() => {
        fetchProduct()
    }, [])

    function handelSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email) {
            return;
        }


        fetch('/api/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then((res) => res.json())
            .then(data => {
                fetchProduct();
                 setForm({ name: "", email: "" })
                console.log(data)
            })

    }

    function upDateForm(event, field) {
        if (field === "name") {
            setForm({
                ...form,
                [field]: event.target.value
            })
        } else if (field === "email") {
            setForm({
                ...form,
                [field]: event.target.value
            })

        }
    }

    function fetchProduct() {
        fetch('/api/products')
            .then((res) => res.json())
            .then(data => {
                setProducts(data)
            });
    }
    const DeleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, {
            method: "DELETE"
        }).then((res) => res.json())
            .then(data => {
                fetchProduct();
                console.log(data)

            })
    }

    return (
        <>
            <div className="card" >
                <div className="card-header">
                    Add Product
                </div>
                <div className="card-body">
                    <form onClick={handelSubmit}>
                        <input type="text" placeholder="Emplotyee Name" className="form-control mt-3" value={form.name} onChange={() => upDateForm(event, "name")} />
                        <input type="text" placeholder="Employee Email" className="form-control mt-3" value={form.email} onChange={() => upDateForm(event, "email")} />
                        <button className="btn btn-primary mt-2" type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <ul className="list-group mt-4">
                {
                    products.map((product) => {
                        return (

                            <li className="list-group-item d-flex justify-content-between align-center mt-2" key={product.id}>
                                <div>
                                    <strong >{product.name}:</strong>
                                    {product.email}
                                </div>
                                <button className="btn btn-outline-dark" onClick={() => DeleteProduct(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillrRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                            </li>

                        )
                    })
                }

            </ul>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))