import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "color-quantity":
        element = (
          <div className="flex flex-col gap-2">
            {/* Dropdown to Select Colors */}
            <Select
              onValueChange={(selectedColorId) => {
                const selectedColor = getControlItem.options.find(
                  (color) => color.id === selectedColorId
                );

                if (
                  selectedColor &&
                  !formData.colors.some((c) => c.colorName === selectedColor.label)
                ) {
                  setFormData({
                    ...formData,
                    colors: [
                      ...(formData.colors || []),
                      {
                        colorName: selectedColor.label,
                        code: selectedColor.code,
                        quantity: 0,
                      },
                    ],
                  });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                {getControlItem.options.map((color) => (
                  <SelectItem key={color.id} value={color.id}>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.code }}
                      ></span>
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* List of Selected Colors with Quantity Input */}
            {formData.colors.length > 0 &&
              formData.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.code }}
                    ></span>
                    <span className="font-semibold">{color.colorName}</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={color.quantity}
                    onChange={(event) => {
                      const newColors = [...formData.colors];
                      newColors[index].quantity =
                        parseInt(event.target.value, 10) || 0;
                      setFormData({ ...formData, colors: newColors });
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        colors: formData.colors.filter((_, i) => i !== index),
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
          </div>
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;