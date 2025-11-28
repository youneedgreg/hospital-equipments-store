"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories, suppliers } from "@/lib/data"
import { SlidersHorizontal, X } from "lucide-react"

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  selectedSuppliers: string[]
  onSuppliersChange: (suppliers: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  inStockOnly: boolean
  onInStockChange: (inStock: boolean) => void
}

export function ProductFilters({
  selectedCategories,
  onCategoriesChange,
  selectedSuppliers,
  onSuppliersChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange)

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  const handleSupplierToggle = (supplier: string) => {
    if (selectedSuppliers.includes(supplier)) {
      onSuppliersChange(selectedSuppliers.filter((s) => s !== supplier))
    } else {
      onSuppliersChange([...selectedSuppliers, supplier])
    }
  }

  const clearFilters = () => {
    onCategoriesChange([])
    onSuppliersChange([])
    onPriceRangeChange([0, 300000])
    setLocalPriceRange([0, 300000])
    onInStockChange(false)
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSuppliers.length > 0 ||
    inStockOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 300000

  const FilterContent = () => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full justify-start text-muted-foreground">
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}

      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
              />
              <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal flex-1 cursor-pointer">
                {category.name}
              </Label>
              <span className="text-xs text-muted-foreground">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={localPriceRange}
            min={0}
            max={300000}
            step={1000}
            onValueChange={(value) => setLocalPriceRange(value as [number, number])}
            onValueCommit={(value) => onPriceRangeChange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>KSh {localPriceRange[0].toLocaleString()}</span>
            <span>KSh {localPriceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Availability</h4>
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => onInStockChange(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Suppliers</h4>
        <div className="space-y-2">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center gap-2">
              <Checkbox
                id={`sup-${supplier.id}`}
                checked={selectedSuppliers.includes(supplier.name)}
                onCheckedChange={() => handleSupplierToggle(supplier.name)}
              />
              <Label htmlFor={`sup-${supplier.id}`} className="text-sm font-normal flex-1 cursor-pointer">
                {supplier.name}
              </Label>
              <span className="text-xs text-muted-foreground">{supplier.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-4">Filters</h3>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                {selectedCategories.length + selectedSuppliers.length + (inStockOnly ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
