import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X, ArrowRight, ShoppingBag, User, HelpCircle } from 'lucide-react';
import CommonForms from "./CommonForms"
import { emailSchema } from '../lib/zod/validation'

const SheetMenu = ({ dialogOpen,cartOpen, setCartOpen, setDialogOpen }) => {
    const defaultValues={
        email:'',
        message:''
    }
  const primaryLinks = [
    { name: "Configurator", href: "/configurator", desc: "Design custom applications for your business..." },
    { name: "Models & Series", href: "/blogs/Cloud Software and Saas Platforms", desc: "Explore a list of amazing interior design models" },
    { name: "Visualizer", href: "/visualizer", desc: "Interactive AI tools and models for business growth" },
    { name: "Our Story", href: "/about", desc: "Engineering & philosophy" },
  ];

  const secondaryLinks = [
    { name: "Support & Manuals", href: "/support", icon: HelpCircle },
    { name: "Account Profile", href: "/account", icon: User },
    { name: "View Orders", href: "/orders", icon: ShoppingBag },
  ];

  return (
    <Sheet modal={false} open={cartOpen} onOpenChange={() => setCartOpen(!cartOpen)}>
      <SheetContent 
        showCloseButton={false} 
        side="top" 
        /* FIXED: relative layout context with safe bottom breathing room (pb-28 or pb-32) */
        className="z-[99999] bg-white fixed slide-in-from-top-96 duration-100 left-0 right-0 top-0 h-screen max-h-screen pt-6 px-4 sm:px-10 pb-32 flex flex-col overflow-hidden"
      >
        {/* Top Header Row - Fixed */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-6 w-full shrink-0">
          <h1 className="text-black uppercase font-bosch tracking-wider text-xl sm:text-2xl font-bold">
            build yours
          </h1>
          <button 
            onClick={() => setCartOpen(false)} 
            className="cursor-pointer rounded-full p-2.5 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X width={24} height={24} className="text-black" />
          </button>
        </div>

        {/* Scrollable Middle Navigation Content Wrapper */}
        <div className="flex-1 overflow-y-auto mt-4 mb-2 pr-1 w-full scrollbar-thin">
          <div className="pt-2 pb-6 mx-auto w-full flex flex-col gap-y-8">
            
            {/* Navigation panel links */}
            <nav className="flex flex-col gap-y-5">
              <p className="text-xl font-bold font-bosch uppercase tracking-widest text-black mb-2">Navigation</p>
              {primaryLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-50 hover:border-black transition-colors duration-300"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-medium text-gray-900 group-hover:text-black block transition-transform duration-300 font-bosch">
                      {link.name}
                    </span>
                    <span className="text-xs text-black font-bosch mt-1 block">
                      {link.desc}
                    </span>
                  </div>
                  <ArrowRight className="hidden sm:block text-gray-300 group-hover:text-black  transition-all duration-300" size={20} />
                </a>
              ))}
            </nav>

            {/* Featured Promo Card Block */}
            <div className="flex flex-col font-bosch justify-between bg-black text-white p-6 rounded-xl border border-gray-100">
              <div>
                <span className="inline-block bg-black text-white text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded mb-4">
                  New Release
                </span>
                <h3 className="text-xl font-bold mb-2">Email us:</h3>
                {/* <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Experience a completely reimagined way to structure your interactive data pipelines. Get started with our latest configurator tools.
                </p> */}
                <CommonForms inputTextStyle={"text-black"} emailSchema={emailSchema} defaultValues={defaultValues} formElement="email"/>
              </div>
              
              <Button 
                onClick={() => setDialogOpen(!dialogOpen)}
                className="w-full bg-white text-black hover:bg-gray-800 font-medium py-6 rounded-lg transition-all flex hover:font-semibold items-center justify-center gap-2"
              >
                Chat with us <ArrowRight size={16} />
              </Button>
            </div>

          </div>
        </div>

        {/* FIXED & ANCHORED: Absolute bottom alignment forces visibility */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pt-6 pb-6 px-4 sm:px-10 z-10 shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-7xl mx-auto w-full">
            
            {/* Quick Access Utility Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {secondaryLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={index} 
                    href={link.href} 
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <Icon size={16} />
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Legal / Footnote */}
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Your Brand Inc. All rights reserved.
            </p>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;