import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { UserContext } from "./UserProvider";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  console.log("ProductProvider");
  const { userAuth } = useContext(UserContext);

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [ProductsUser, setProductsUser] = useState([]);
  const [productsCategoryList, setProductsCategoryList] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // obtener de la base de datos firebase un solo producto en especifico
  const getProduct = async (id) => {
    console.log("getProduct");
    setLoadingProduct(true);
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      setProduct({ ...docSnap.data(), id: docSnap.id });
      setImages(docSnap.data().photos);
      setLoadingProduct(false);
    } catch (error) {
      console.log(error);
    }
  };

  // obtener lista de productos por usuario especifico
  const getProductsUser = async (idUser) => {
    console.log("getProductUser");
    try {
      const q = query(
        collection(db, "products"),
        where("id_user", "==", idUser)
      );

      const querySnapshot = await getDocs(q);

      const prod = [];

      querySnapshot.forEach((doc) => {
        prod.push({ ...doc.data(), id: doc.id });
      });

      setProductsUser(prod);
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los productos por categorias especificas
  const getProductsCategoryList = async (name) => {
    console.log("getProductsCategoryList");

    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", name)
      );

      const querySnapshot = await getDocs(q);
      const prod = [];
      querySnapshot.forEach((doc) => {
        prod.push({ ...doc.data(), id: doc.id });
      });
      setProductsCategoryList(prod);
    } catch (error) {
      console.log(error);
    }
  };

  // crear productos
  const saveProduct = async (data, photos) => {
    console.log("guardar productos");

    setLoadingProduct(true);
    let namePhotos = [];
    for (let index = 0; index < photos.length; index++) {
      const element = photos[index];
      //guardar fotos en storage con el nombre
      const storageRef = ref(
        storage,
        `products/${element.name + "-" + Date.now()}`
      );
      await uploadBytes(storageRef, element).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      const imageURL = await getDownloadURL(storageRef);
      namePhotos.push(imageURL);
      console.log(imageURL);
    }

    const {
      name_product,
      description_product,
      price_product,
      category_product,
      stock_product,
      discount_product,
    } = data;

    await addDoc(collection(db, "products"), {
      name: name_product,
      description: description_product,
      price: price_product,
      category: category_product,
      stock: stock_product,
      discount: discount_product,
      id_user: userAuth.uid,
      photos: namePhotos,
    });

    setLoadingProduct(false);
  };

  // eliminar producto
  const deleteProductList = async (productDelete) => {
    console.log("eliminar producto");
    setLoadingProduct(true);
    for (let index = 0; index < productDelete.photos.length; index++) {
      const desertRef = ref(storage, `products/${productDelete.photos[index]}`);
      await deleteObject(desertRef);
    }
    await deleteDoc(doc(db, "products", productDelete.id));
    setLoadingProduct(false);
  };

  const addToCartProduct = async (productToCart, quantity) => {
    console.log("agregar prod al carrito");
    const productsArray = [];
    const photo = productToCart.photos[0];
    productsArray.push({
      name: productToCart.name,
      description: productToCart.description,
      price: productToCart.price,
      category: productToCart.category,
      stock: productToCart.stock,
      discount: productToCart.discount,
      id_user: productToCart.id_user,
      id: productToCart.id,
      quantity: quantity,
      photo,
    });



    if (!localStorage.getItem("productsToCart")) {
      console.log("si no hay localStorage");
      localStorage.setItem("productsToCart", JSON.stringify(productsArray));
    } else {
      console.log("si hay localStorage");
      const productsLocalStorage = JSON.parse(
        localStorage.getItem("productsToCart")
      );

      const prodExisting = productsLocalStorage.filter(
        (prod) => prod.id === productToCart.id
      );
      
      if (prodExisting.length > 0) {
        console.log("si hay un producto con el id indicado");
        const arrayeditado = productsLocalStorage.map((prod) =>
          prod.id === productToCart.id & prod.quantity + quantity <= prod.stock
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        );
        localStorage.removeItem("productsToCart");
        localStorage.setItem("productsToCart", JSON.stringify(arrayeditado));
      } else {
        console.log("no hay productos con el id");
        const productsLocalStorage = JSON.parse(
          localStorage.getItem("productsToCart")
        );
        localStorage.setItem(
          "productsToCart",
          JSON.stringify([
            ...productsLocalStorage,
            { ...productToCart, quantity: quantity, photo: photo },
          ])
        );
      }
    }
  };

  const getProductsToCart = () => {
    console.log("getCarrito");
    const productsOfCart = JSON.parse(localStorage.getItem("productsToCart"));
    return productsOfCart;
  };

  const updateProductsTocart = useCallback((id, value) => {
    const productsOfCart = JSON.parse(localStorage.getItem("productsToCart"));
    const productsEdited = productsOfCart.map((product) =>
      product.id === id ? { ...product, quantity: value } : product
    );
    localStorage.removeItem("productsToCart");
    localStorage.setItem("productsToCart", JSON.stringify(productsEdited));
  }, []);

  const deleteProductOfCart = (idProduct) => {
    console.log("eliminar prod del carrito");
    console.log(idProduct);
    const productsOfCart = JSON.parse(localStorage.getItem("productsToCart"));
    const newProductsOfCart = productsOfCart.filter(
      (product) => product.id !== idProduct
    );
    localStorage.removeItem("productsToCart");
    localStorage.setItem("productsToCart", JSON.stringify(newProductsOfCart));
  };

  const saveProductBuy = (product) => {
    localStorage.productBuy=JSON.stringify(product)
  }
  
  const getProductBuy = () => {
    const product = JSON.parse(localStorage.productBuy)
    return product
  }

  // editar el stock de cada producto al vender
  const editStockProduct = async(products) => {
    setLoadingProduct(true)
    products.map(async prod => {
      const docRef = await doc(db, "products", prod.id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      
      updateDoc(docRef, {
        stock: docSnap.data().stock - prod.quantity,
      });

    })

    setLoadingProduct(false)

  }
  
  
  return (
    <ProductContext.Provider
      value={{
        product,
        images,
        getProduct,
        getProductsUser,
        ProductsUser,
        getProductsCategoryList,
        productsCategoryList,
        loadingProduct,
        saveProduct,
        deleteProductList,
        addToCartProduct,
        getProductsToCart,
        updateProductsTocart,
        deleteProductOfCart,
        saveProductBuy,
        getProductBuy,
        editStockProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
