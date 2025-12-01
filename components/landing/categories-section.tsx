"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { categories, categoryDetails } from "@/lib/data"

export function CategoriesSection() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a wide range of medical products across various categories.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <Link href={`/categories/${category.id}`} className="block">
                <Image
                  src={categoryDetails[category.id]?.image || "/placeholder.svg"}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="h-48 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold">{category.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}