import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Upload, X, Check, FileImage, MessageSquareQuote, Shirt } from "lucide-react";
import designHero from "@/assets/casual-wear.jpg";

const fileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, "Max file size is 10MB")
    .refine((file) => ["image/jpeg", "image/png", "application/pdf", "image/svg+xml", "application/postscript"].includes(file.type), 
      "Only JPG, PNG, PDF, SVG, and AI files are allowed"),
});

const customDesignSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  organization: z.string().optional(),
  garmentType: z.string().min(1, "Please select a garment type"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  colors: z.string().min(1, "Please specify colors"),
  embroideryRequired: z.boolean().default(false),
  printingRequired: z.boolean().default(false),
  deliveryDate: z.string().min(1, "Please select a delivery date"),
  additionalNotes: z.string().optional(),
});

type CustomDesignFormValues = z.infer<typeof customDesignSchema>;

const CustomDesign = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CustomDesignFormValues>({
    resolver: zodResolver(customDesignSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      garmentType: "",
      quantity: 1,
      colors: "",
      embroideryRequired: false,
      printingRequired: false,
      deliveryDate: "",
      additionalNotes: "",
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        fileSchema.parse({ file });
        setUploadedFiles((prev) => [...prev, file]);
        setUploadProgress((i + 1) / files.length * 100);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}: Invalid file`);
      }
    }

    setUploadProgress(0);
    setIsUploading(false);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: CustomDesignFormValues) => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one design file");
      return;
    }

    try {
      // Prepare form data
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      // Add files
      uploadedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
      formData.append("file_count", uploadedFiles.length.toString());

      // Send to server
      const response = await fetch("/api/custom-orders", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit order");

      toast.success("Design request submitted successfully! We'll contact you soon with a quote.");
      form.reset();
      setUploadedFiles([]);
    } catch (error) {
      toast.error("Failed to submit design request. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/70 via-white to-white pb-12">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={designHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/55 to-gray-900/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Custom orders</p>
          <h1 className="mt-3 max-w-xl text-4xl font-bold text-white md:text-5xl">
            Upload Your Design
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Send us your custom designs, logos, sketches, or style inspirations. Our team will create the perfect personalized apparel for you.
          </p>
        </div>
      </section>

      {/* Steps */}
      <div className="container mx-auto px-4">
        <ol className="relative z-10 -mt-8 grid gap-3 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:grid-cols-3 md:p-6">
          {[
            { icon: FileImage, title: "1. Upload your files", text: "Logos, sketches or photos" },
            { icon: MessageSquareQuote, title: "2. Get a quote", text: "We reply within 24 hours" },
            { icon: Shirt, title: "3. We make it", text: "Sewn, embroidered or printed" },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-amber-600">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">{title}</span>
                <span className="block text-sm text-gray-500">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Upload Area */}
          <Card className="min-w-0 lg:col-span-1 h-fit border-gray-200 bg-white shadow-sm lg:sticky lg:top-40">
            <CardHeader>
              <CardTitle>Upload Your Files</CardTitle>
              <CardDescription>Add one or more design files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <label className="block">
                <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors bg-amber-50/60">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Click to choose files</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF, SVG, AI (Max 10MB)</p>
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.svg,.ai"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>
              </label>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-center">{Math.round(uploadProgress)}%</p>
                </div>
              )}

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <p className="text-xs text-gray-800 truncate">{file.name}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-500 hover:text-red-600 flex-shrink-0" aria-label={`Remove ${file.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="min-w-0 lg:col-span-2 border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Fill in your custom order information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="border-l-4 border-primary pl-2 text-sm font-semibold text-gray-900">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+233..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization/School (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="School or Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    <h3 className="border-l-4 border-primary pl-2 text-sm font-semibold text-gray-900">Order Details</h3>
                    <FormField
                      control={form.control}
                      name="garmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Garment Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select garment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="school-uniform">School Uniform</SelectItem>
                              <SelectItem value="kids-underwear">Kids Underwear</SelectItem>
                              <SelectItem value="custom-dress">Custom Dress</SelectItem>
                              <SelectItem value="kids-t-shirt">Kids T-Shirt</SelectItem>
                              <SelectItem value="corporate-uniform">Corporate Uniform</SelectItem>
                              <SelectItem value="cardigan">Cardigan</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity Required *</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" placeholder="50" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="colors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Colors *</FormLabel>
                            <FormControl>
                              <Input placeholder="Navy Blue, White" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-4">
                    <h3 className="border-l-4 border-primary pl-2 text-sm font-semibold text-gray-900">Additional Services</h3>
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="embroideryRequired"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Embroidery Required
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="printingRequired"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Printing Required
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="deliveryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Delivery Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your custom order..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum 500 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:gap-4">
                    <Button type="submit" size="lg" className="flex-1 text-gray-900">
                      Submit Design Request
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        form.reset();
                        setUploadedFiles([]);
                      }}
                    >
                      Clear Form
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500">
                    * Required fields. We'll review your design and contact you within 24 hours with a custom quote.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CustomDesign;
