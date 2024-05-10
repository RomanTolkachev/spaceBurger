
const initialState = [
    {
        _id:"643d69a5c3f7b9001cfa093c",
        name:"Краторная булка N-200i",
        type:"bun",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0,
    },
    {
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
    },
    {
        _id:"643d69a5c3f7b9001cfa0946",
        name:"Хрустящие минеральные кольца",
        type:"main",
        proteins:808,
        fat:689,
        carbohydrates:609,
        calories:986,
        price:300,
        image:"https://code.s3.yandex.net/react/code/mineral_rings.png",
        image_mobile:"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
        __v:0,
    }
];

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        default: return state
    }
}