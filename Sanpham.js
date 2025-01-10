
localStorage.removeItem('cart');
arr = [];
console.log("Giỏ hàng đã được xóa");
var arr = JSON.parse(localStorage.getItem('cart')) || [];
function themvaogio(id, tensp, gia, hinh) {
    var TTSP = false;
    for (var i = 0; i < arr.length; i++) {
        var sp = arr[i];
        if (sp.id == id) {
            sp.quantity++;
            TTSP = true;
            break;
        }
    }
    if (!TTSP) {
        alert("Đã thêm vào giỏ hàng.");
            arr.push({ 
                imagehinh: hinh,
                id: id,
                tensp: tensp,
                gia: gia,
                quantity: 1
    });
    }else alert("Giỏ hàng của bạn đã tồn tại sản phẩm này.");
    localStorage.setItem('cart', JSON.stringify(arr));
    console.log(arr);
}
