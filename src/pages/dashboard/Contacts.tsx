import { useState, useEffect } from "react";
import { Plus, Upload, MoreHorizontal, Phone, Mail, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Contact {
  id: string;
  full_name: string;
  phone_number: string;
  company_name?: string;
  status: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  // Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Dummy data for dev preview if DB is empty/not connected
      setContacts([
        { id: '1', full_name: 'Alice Johnson', phone_number: '+15550123456', company_name: 'Tech Corp', status: 'pending' },
        { id: '2', full_name: 'Bob Smith', phone_number: '+15550127890', company_name: 'Design Studio', status: 'completed' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const newContact = {
        user_id: user?.id,
        full_name: newName,
        phone_number: newPhone,
        company_name: newCompany,
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert([newContact])
        .select()
        .single();

      if (error) throw error;

      setContacts([data, ...contacts]);
      setIsAddOpen(false);
      setNewName("");
      setNewPhone("");
      setNewCompany("");
      
      toast({
        title: "Contact added",
        description: `${newName} has been added to your list.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding contact",
        description: error.message,
      });
    }
  };

  const deleteContact = async (id: string) => {
    try {
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) throw error;
        setContacts(contacts.filter(c => c.id !== id));
        toast({ title: "Contact deleted" });
    } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your lead list and track call status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import CSV
          </Button>
          <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Contact
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Contact</SheetTitle>
                <SheetDescription>
                  Enter the details of the person you want the AI to call.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleAddContact} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={newName} onChange={e => setNewName(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="+1234567890" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" value={newCompany} onChange={e => setNewCompany(e.target.value)} />
                </div>
                <Button type="submit" className="mt-4">Save Contact</Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.full_name}</TableCell>
                <TableCell>{contact.phone_number}</TableCell>
                <TableCell>{contact.company_name || '-'}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contact.status === 'completed' ? 'bg-green-100 text-green-800' :
                    contact.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.phone_number)}>
                        Copy Phone
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => deleteContact(contact.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {contacts.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No contacts found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Contacts;
