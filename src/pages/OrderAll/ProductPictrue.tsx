import { useEffect } from "react";
import { useGetApiProductsId } from "../../API";
import noImage from "../../assets/images/noImage.jpg";
const ProductPictrue: React.FC<{ productId: number }> = ({ productId }) => {
  const productResponse = useGetApiProductsId(productId);

  return (
    <div className="d-flex justify-content-center">
      <img
        src={
          productResponse.data?.data?.imageUrl &&
          productResponse.data?.data?.imageUrl[0]
            ? productResponse.data?.data?.imageUrl[0]
            : noImage
        }
        alt="book"
        style={{
          height: "50px%",
          objectFit: "cover",
          backgroundColor: "#FFFFFf",
          backgroundSize: "contain",
        }}
      />
    </div>
  );
};

export default ProductPictrue;
