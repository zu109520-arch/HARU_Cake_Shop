import { describe, it, expect } from 'vitest'
import { getUsernameFromEmail, isValidEmail, calculateTotal, isStockAvailable, getStockStatus, isValidPhone, isValidName, isValidAddress} from './utils'

describe('getUsernameFromEmail', () => {
  it('應該取出 @ 前面的帳號名稱', () => {
    expect(getUsernameFromEmail('haru@gmail.com')).toBe('haru')
  })
})

describe('isValidEmail', () => {
  it('應該接受正確格式的 email', () => {
    expect(isValidEmail('haru@gmail.com')).toBe(true);
  });

  it('應該拒絕沒有 @ 的字串', () => {
    expect(isValidEmail('harugmail.com')).toBe(false);
  });

  it('應該拒絕空字串', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('應該拒絕開頭就是 @ 的字串', () => {
    expect(isValidEmail('@gmail.com')).toBe(false);
  });
});

describe('calculateTotal', () => {
  it('這段加總應該價格會是250元'  , () => { 
    expect(calculateTotal([ { price: 100, quantity: 2 }, { price: 50, quantity: 1 } ])).toBe(250);  
  });

  it('購物車裡沒有任何商品，總金額應該要是0元',()=>{
    expect(calculateTotal([])).toBe(0);
  });
  
  it('商品沒有quantity欄位時，應該當作購買一個計算',()=>{
    expect(calculateTotal([{ price: 500 }])).toBe(500);
  });
});

describe('isStockAvailable', ()=>{     
  it('庫存至少還有一個的時候', ()=>{expect(isStockAvailable(1)).toBe(true)});     
  it('庫存是0的時候',()=>{expect(isStockAvailable(0)).toBe(false)});
  });

describe('getStockStatus', ()=>{
it('根據庫存數量，應該顯示販售中', () =>{
  expect(getStockStatus(10)).toBe('販售中');
});

it ('根據庫存數量，應該顯示即將售完', () =>{
  expect(getStockStatus(3)).toBe('即將售完');
});

it ('根據庫存數量，應該顯示已售完', () =>{
  expect(getStockStatus(0)).toBe('已售完');
});

it('庫存是4的時候，應該顯示販售中（邊界測試）', () => {
  expect(getStockStatus(4)).toBe('販售中');
});
});

describe('isValidPhone', ()=>{
  it('應該輸入正確的手機號碼', ()=>{
    expect(isValidPhone('0912345678')).toBe(true);
});

it('如果電話開頭兩個數字不正確', ()=>{
  expect(isValidPhone('0612345678')).toBe(false);
});

it('如果電話的位數太少', ()=>{
  expect(isValidPhone('09123')).toBe(false);
});

it('如果電話的位數太多', ()=>{
  expect(isValidPhone('091234567890')).toBe(false);
});
});

describe('isValidName', ()=>{
it('應該輸入正確的姓名(至少兩個字，且不含數字)', () => {
  expect(isValidName('羅子晴')).toBe(true);
});

it('如果輸入的姓名包含數字', () => {
  expect(isValidName('羅子晴123')).toBe(false);
});

it('如果輸入的姓名只有一個字', () => {
  expect(isValidName('羅')).toBe(false);
});
});

describe('isValidAddress', ()=>{
it('如果地址有包含縣或市，就通過', ()=> {
  expect(isValidAddress('台北市文山區甜點路101號')).toBe(true);
});

it('如果地址沒有包含縣或市，就不通過', ()=> { 
  expect(isValidAddress('文山區甜點路101號')).toBe(false);
});
});