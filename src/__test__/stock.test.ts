import { describe, beforeEach, afterEach, expect, test } from "bun:test";
import { PrismaClient, item_jenis } from "@prisma/client";

describe("Stock Testing", () => {
    const prisma = new PrismaClient();

    beforeEach(async () => {
        await prisma.$transaction(async (prisma) => {
            const item = await prisma.item.create({
                data: {
                    kode: "234567",
                    nama: "Pakan Kucing Bolt Ikan Ungu 800gr",
                    jenis: item_jenis.kucing
                }
            });
            await prisma.stock.create({
                data: {
                    item_id: item.id,
                    harga: 18000,
                    jumlah: 25,
                }
            });
        });
    });

    afterEach(async () => {
        await prisma.stock.deleteMany({});
        await prisma.item.deleteMany({});
    });

    // Create Stock
    test("Add new stock", async () => {
        await prisma.$transaction(async (prisma) => {
            const item = await prisma.item.create({
                data: {
                    kode: "234565",
                    nama: "Pakan Anjing Dog Choize Beef 800gr",
                    jenis: item_jenis.anjing
                }
            });
            await prisma.stock.create({
                data: {
                    item_id: item.id,
                    harga: 15000,
                    jumlah: 25,
                }
            });
        });
    });

    // Read Stock
    test("Get all stock", async () => {
        const stock = await prisma.stock.findMany();
        expect(stock.length).toBe(1)
    });

    // Update Stock
    test("Edit an stock", async () => {
        const stock = await prisma.stock.findFirst();
        const updatedStock = await prisma.stock.update({
            where: { id: stock?.id },
            data: {
                jumlah: 20,
            }
        });
        expect(updatedStock.jumlah).toEqual(20);
    });

    // Delete Stock
    test("Remove an stock", async () => {
        const stock = await prisma.stock.findFirst();
        const deleteItem = await prisma.stock.delete({
            where: { id: stock?.id }
        });
        expect(deleteItem).toBeDefined();
    });
});