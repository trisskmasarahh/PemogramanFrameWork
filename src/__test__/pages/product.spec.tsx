import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/pages/produk";

jest.mock('next/router', () => ({
    useRouter: () => ({
        route: "/produk",
        pathname: "",
        query: {},
        asPath: "",
        push: jest.fn(),
        events: { 
            on: jest.fn(),
            off: jest.fn(),
        },
        isReady: true,
    }),
}));
        
describe("Product Page", () => {
    it("renders product page correctly", () => {
        const page = render(<TampilanProduk />);
        expect(screen.getByTestId("title").textContent).toBe("Product Page"); 
        expect(page).toMatchSnapshot();
    })
})