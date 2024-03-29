import { cache } from 'react'
import { connectToDatabase } from "@/core/mongo/db";
import shopSettings from '@/lib/shop/shopSettings'

const { db } = await connectToDatabase(); 

export async function getAllShopProducts(){
  const fetchResult = await db.collection("products").find({}).toArray()
  const result = JSON.parse(JSON.stringify(fetchResult))
  // console.log(result)
  return result
}

export const getShopProducts = cache(async (pageParams) => {
    let dbPage = pageParams?.page ? pageParams.page : 1
    let dbFindQuery = {}
    let dbSortQuery = {'_id' : 1}

    for(let key in pageParams){
        switch(key){
            case 'inStock' : 
                dbFindQuery.inStock = true
              break
            case 'category' : 
                dbFindQuery.category = pageParams[key]
              break  
            case 'sortBy' :
              if(pageParams[key] == 'cheap') dbSortQuery = {'price' : 1}
              if(pageParams[key] == 'expensive') dbSortQuery = {'price' : -1}
              break
            default : break
        }
    }

    // console.log('FindQuery', dbFindQuery)
    // console.log('SotrQuery', dbSortQuery)
    // console.log('Page', dbPage)

    const fetchResult = await db.collection("products").aggregate([
        {
          $facet : {
            'totalCount' : [{$match : dbFindQuery},{  $count: 'count' }],
            'currentProducts' : [
              {$match : dbFindQuery},
              {$sort : dbSortQuery},
              { $skip: (dbPage - 1) * shopSettings.productsPerPage },
              { $limit: 10 }
            ]
          }
        }
    ]).toArray()

    const result = JSON.parse(JSON.stringify(fetchResult[0]))
    return result
})

export const getShopProduct = cache(async (slug) => {
  const product = await db.collection('products').find({'slug' : slug}).limit(1).toArray()
  return JSON.parse(JSON.stringify(product[0]))
})

export async function getShopCats(){
    const result = await db.collection("products").aggregate([
      { 
        $group: { _id: "$category", count: { $sum: 1 } },
      },
      {$sort: {'_id': 1}}
    ]).toArray();
    return result
}