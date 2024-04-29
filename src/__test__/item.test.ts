import { describe, beforeEach, afterEach, expect, test } from "bun:test";
import { PrismaClient, item_jenis } from "@prisma/client";

describe("Item Testing", () => {
    const prisma = new PrismaClient

    beforeEach(async () => {
        const item = await prisma.item.create({
            data: {
                kode: "234567",
                nama: "Pakan Kucing Bolt Ikan Ungu 800gr",
                jenis: item_jenis.kucing
            }
        });
    });

    afterEach(async () => {
        await prisma.item.deleteMany({});
    });

    // Create Item
    test("Add new item", async () => {
        const item = await prisma.item.create({
            data: {
                kode: "234568",
                nama: "Pakan Anjing Dog Choize Beef 800gr",
                jenis: item_jenis.anjing
            }
        });
        expect(item.id).toBeDefined();
    });

    // Read Item
    test("Get all item", async () => {
        const items = await prisma.item.findMany();
        expect(items.length).toBe(1);
    });

    // Update Item
    test("Edit an item", async () => {
        const newNama = "Pakan Anjing Dog Choize Beef Biru 800gr"
        const updatedItem = await prisma.item.update({
            where: { kode: "234567" },
            data: { nama: newNama }
        });
        expect(updatedItem.nama).toEqual(newNama);
    });

    // Delete Item
    test("Remove an item", async () => {
        const deletedItem = await prisma.item.delete({
            where: { kode: "234567" }
        });
        expect(deletedItem).toBeDefined();
    });
});

