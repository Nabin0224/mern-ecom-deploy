import React from "react";
import { filterOptions } from "@/config/index";
import { Fragment } from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-extrabold text-md">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="mb-10">
              <h3 className="font-bold text-sm">{keyItem}</h3>
              <div className="grid gap-2 mt-2 border-b mb-2 p-2">
                {filterOptions[keyItem].map((options) => (
                  <Label key={options.id} className="flex items-center gap-1">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] && filters[keyItem].indexOf(options.id) > -1
                      }
                      onCheckedChange={ () => handleFilter(keyItem, options.id)}
                    />
                    {options.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
