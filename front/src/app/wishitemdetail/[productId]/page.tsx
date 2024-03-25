const WishItemDetail = ( { params }: {
  params: { productId: string }
}) => {

  return (
    <>
      <div>Product ID: {params.productId}</div>
    </>
  )
}

export default WishItemDetail;