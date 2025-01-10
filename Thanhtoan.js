let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsELE = document.querySelector("tbody");
let TTbandau = document.querySelector('.TTien');
let Tienapma = document.querySelector('.TTienMA');

// Hiển thị giỏ hàng
function renderUI(arr) {
    productsELE.innerHTML = '';
    arr.forEach(p => {
        productsELE.innerHTML += `
            <tr>
					<td>${p.tensp}<strong class="mx-2">x</strong>${p.quantity}</td>
					<td>${convertMoney(p.gia*p.quantity)}</td>
			</tr>
        `;
    });
    updateTotalMoney(arr);
}
let btnPromotion = document.querySelector('.Apdung');

btnPromotion.addEventListener('click', function () {
    updateTotalMoney(cart);
});
// Cập nhật tổng tiền
function updateTotalMoney(arr) {
    let totalMoney = 0;
    arr.forEach(p => {
        totalMoney += p.gia * p.quantity;
    });
    let discount = checkPromotion();
    let discountedTotal = totalMoney - (totalMoney * discount / 100);
    TTbandau.innerText = convertMoney(totalMoney);
    Tienapma.innerText = convertMoney(discountedTotal);
}

// Kiểm tra mã giảm giá
function checkPromotion() {
    const promotionCodes = { A: 10, B: 20, C: 30, D: 40 };
    const inputCode = document.querySelector('#Giamgia').value;
    return promotionCodes[inputCode] || 0;
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderUI(cart);
}

// Thay đổi số lượng sản phẩm
function changeTotalProduct(id, e) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity = Number(e.target.value);
        }
    }
    renderUI(cart);
}

// Chuyển đổi tiền tệ
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// Hiển thị giỏ hàng khi tải trang
window.onload = () => renderUI(cart);
function Dathang(){
    if(cart.length == 0) alert("Bạn chưa có sản phẩm nào để đặt hàng.")
        else alert("Đặt hàng thành công. Xin cảm ơn quý khách.")
}
