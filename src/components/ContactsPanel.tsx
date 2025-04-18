
import { useState } from "react";
import { UserPlus, X, Users, Edit, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface ContactsPanelProps {
  contacts: Contact[];
  onContactsUpdate: (contacts: Contact[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ContactsPanel = ({
  contacts,
  onContactsUpdate,
  isOpen,
  onClose,
}: ContactsPanelProps) => {
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(newContact.phone.replace(/[\s-]/g, ""))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const updatedContacts = [
      ...contacts,
      { id: Date.now().toString(), ...newContact },
    ];
    onContactsUpdate(updatedContacts);
    setNewContact({ name: "", phone: "" });
    toast.success("Contact added successfully");
  };

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    onContactsUpdate(updatedContacts);
    toast.success("Contact removed");
  };

  const startEditing = (contact: Contact) => {
    setEditingId(contact.id);
    setEditForm({ name: contact.name, phone: contact.phone });
  };

  const saveEdit = (id: string) => {
    if (!editForm.name || !editForm.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...editForm } : contact
    );
    onContactsUpdate(updatedContacts);
    setEditingId(null);
    toast.success("Contact updated");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium flex items-center">
            <Users size={20} className="mr-2 text-sos-purple" />
            Emergency Contacts
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 text-gray-600">
              Add New Contact
            </h3>
            <div className="grid gap-3">
              <Input
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
                className="border-sos-blue focus:border-sos-purple"
              />
              <Input
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
                className="border-sos-blue focus:border-sos-purple"
              />
              <Button
                onClick={handleAddContact}
                className="w-full bg-sos-purple hover:bg-sos-purple/90 text-black"
              >
                <UserPlus size={16} className="mr-2" />
                Add Contact
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-600">
              Your Emergency Contacts
            </h3>
            {contacts.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No emergency contacts added yet
              </div>
            ) : (
              <ul className="space-y-3">
                {contacts.map((contact) => (
                  <li
                    key={contact.id}
                    className="border rounded-lg p-3 bg-gray-50"
                  >
                    {editingId === contact.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="border-sos-blue"
                        />
                        <Input
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({ ...editForm, phone: e.target.value })
                          }
                          className="border-sos-blue"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(contact.id)}
                            className="bg-sos-blue hover:bg-sos-blue/90 text-black"
                          >
                            <Save size={14} className="mr-1" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{contact.name}</span>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => startEditing(contact)}
                              className="h-7 w-7"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteContact(contact.id)}
                              className="h-7 w-7 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {contact.phone}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPanel;
