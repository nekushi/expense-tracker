// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const categories = [
//   {
//     value: "food",
//     label: "Food",
//   },
//   {
//     value: "transportation",
//     label: "Transportation",
//   },
//   {
//     value: "utilities",
//     label: "Utilities",
//   },
//   {
//     value: "entertainment",
//     label: "Entertainment",
//   },
//   {
//     value: "health",
//     label: "Health",
//   },
//   {
//     value: "education",
//     label: "Education",
//   },
//   {
//     value: "shopping",
//     label: "Shopping",
//   },
//   {
//     value: "savings",
//     label: "Savings",
//   },
//   {
//     value: "others",
//     label: "Others",
//   },
// ];

// export function ComboboxDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[322px] justify-between"
//         >
//           {value
//             ? categories.find((category) => category.value === value)?.label
//             : "Select category..."}
//           <ChevronsUpDown className="opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[322px] p-0">
//         <Command>
//           <CommandInput placeholder="Search category..." className="h-9" />
//           <CommandList>
//             <CommandEmpty>No category found.</CommandEmpty>
//             <CommandGroup>
//               {categories.map((category) => (
//                 <CommandItem
//                   key={category.value}
//                   value={category.value}
//                   onSelect={(currentValue) => {
//                     setValue(currentValue === value ? "" : currentValue);
//                     setOpen(false);
//                   }}
//                 >
//                   {category.label}
//                   <Check
//                     className={cn(
//                       "ml-auto",
//                       value === category.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
