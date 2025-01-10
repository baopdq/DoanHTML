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
                          <td class="product-thumbnail">
                            <img src="./${p.imagehinh}" alt="Image" class="img-fluid">
                          </td>
                          <td class="product-name">
                            <h2 class="h5 text-black">${p.tensp}</h2>
                          </td>
                          <td>${convertMoney(p.gia)}</td>
                          <td>
                            <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
                              <div class="input-group-prepend">
                                <button class="btn btn-outline-black decrease" type="button">&minus;</button>
                              </div>
                              <input type="number" class="form-control text-center quantity-amount" step="1" value="${p.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" onchange="changeTotalProduct(${p.id}, event)">
                              <div class="input-group-append">
                                <button class="btn btn-outline-black increase" type="button">&plus;</button>
                              </div>
                            </div>
                          </td>
                          <td>${convertMoney(p.gia*p.quantity)}</td>
                          <td><a href="#" class="btn btn-black btn-sm" onclick="removeItem(${p.id})">X</a></td>
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
