"""
Sistem Manajemen Perpustakaan Sederhana
Implementasi konsep OOP: Abstract Class, Inheritance, Encapsulation, Polymorphism
"""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional


# ==================== ABSTRACT BASE CLASS ====================
class LibraryItem(ABC):
    """
    Abstract Base Class untuk semua item perpustakaan.
    Menerapkan konsep Abstraction dan menjadi blueprint untuk subclass.
    
    Attributes:
        _id (str): ID unik item (protected)
        _title (str): Judul item (protected)
        _author (str): Penulis/pembuat (protected)
        _year (int): Tahun publikasi (protected)
        _is_available (bool): Status ketersediaan (protected)
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int):
        """
        Constructor untuk LibraryItem
        Menerapkan Encapsulation dengan protected attributes (_)
        """
        self._id = item_id
        self._title = title
        self._author = author
        self._year = year
        self._is_available = True
    
    # ========== PROPERTY DECORATORS (Encapsulation) ==========
    @property
    def id(self) -> str:
        """Getter untuk ID item"""
        return self._id
    
    @property
    def title(self) -> str:
        """Getter untuk title"""
        return self._title
    
    @title.setter
    def title(self, value: str):
        """
        Setter untuk title dengan validasi
        Menerapkan Encapsulation untuk melindungi data
        """
        if not value or not isinstance(value, str):
            raise ValueError("Judul harus berupa string yang tidak kosong")
        self._title = value
    
    @property
    def author(self) -> str:
        """Getter untuk author"""
        return self._author
    
    @property
    def year(self) -> int:
        """Getter untuk year"""
        return self._year
    
    @property
    def is_available(self) -> bool:
        """Getter untuk status ketersediaan"""
        return self._is_available
    
    # ========== ABSTRACT METHODS ==========
    @abstractmethod
    def display_info(self) -> str:
        """
        Abstract method yang HARUS diimplementasikan oleh subclass
        Menerapkan konsep Polymorphism - setiap subclass punya implementasi berbeda
        """
        pass
    
    @abstractmethod
    def get_item_type(self) -> str:
        """
        Abstract method untuk mendapatkan tipe item
        """
        pass
    
    # ========== CONCRETE METHODS ==========
    def borrow(self) -> bool:
        """
        Method untuk meminjam item
        Returns True jika berhasil, False jika item tidak tersedia
        """
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def return_item(self) -> bool:
        """
        Method untuk mengembalikan item
        Returns True jika berhasil
        """
        if not self._is_available:
            self._is_available = True
            return True
        return False
    
    def __str__(self) -> str:
        """
        String representation untuk object
        Menerapkan Polymorphism melalui method overriding
        """
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[{self._id}] {self._title} - {self._author} ({self._year}) - {status}"


# ==================== SUBCLASS: BOOK ====================
class Book(LibraryItem):
    """
    Class Book mewarisi dari LibraryItem (Inheritance)
    Merepresentasikan buku dalam perpustakaan
    
    Additional Attributes:
        _isbn (str): ISBN buku (private)
        _pages (int): Jumlah halaman (private)
        _publisher (str): Penerbit (private)
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int, 
                 isbn: str, pages: int, publisher: str):
        """
        Constructor Book yang memanggil constructor parent class
        Menerapkan konsep Inheritance
        """
        super().__init__(item_id, title, author, year)
        self.__isbn = isbn  # Private attribute (__)
        self.__pages = pages
        self.__publisher = publisher
    
    # ========== PROPERTY DECORATORS ==========
    @property
    def isbn(self) -> str:
        """Getter untuk ISBN (Encapsulation)"""
        return self.__isbn
    
    @property
    def pages(self) -> int:
        """Getter untuk jumlah halaman"""
        return self.__pages
    
    @property
    def publisher(self) -> str:
        """Getter untuk penerbit"""
        return self.__publisher
    
    # ========== IMPLEMENTATION OF ABSTRACT METHODS (Polymorphism) ==========
    def display_info(self) -> str:
        """
        Implementasi spesifik untuk Book
        Menerapkan Polymorphism - implementasi berbeda dari parent
        """
        status = "✓ Tersedia" if self._is_available else "✗ Dipinjam"
        return f"""
{'='*60}
BUKU
{'='*60}
ID         : {self._id}
Judul      : {self._title}
Penulis    : {self._author}
Tahun      : {self._year}
ISBN       : {self.__isbn}
Halaman    : {self.__pages}
Penerbit   : {self.__publisher}
Status     : {status}
{'='*60}
"""
    
    def get_item_type(self) -> str:
        """Implementasi method abstract"""
        return "Buku"
    
    # ========== ADDITIONAL METHODS ==========
    def is_thick_book(self) -> bool:
        """
        Method spesifik untuk Book
        Mengecek apakah buku tebal (>300 halaman)
        """
        return self.__pages > 300


# ==================== SUBCLASS: MAGAZINE ====================
class Magazine(LibraryItem):
    """
    Class Magazine mewarisi dari LibraryItem (Inheritance)
    Merepresentasikan majalah dalam perpustakaan
    
    Additional Attributes:
        _issue_number (int): Nomor edisi (protected)
        _month (str): Bulan publikasi (protected)
        _frequency (str): Frekuensi terbit (protected)
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int,
                 issue_number: int, month: str, frequency: str = "Bulanan"):
        """
        Constructor Magazine
        """
        super().__init__(item_id, title, author, year)
        self._issue_number = issue_number
        self._month = month
        self._frequency = frequency
    
    # ========== PROPERTY DECORATORS ==========
    @property
    def issue_number(self) -> int:
        """Getter untuk nomor edisi"""
        return self._issue_number
    
    @property
    def month(self) -> str:
        """Getter untuk bulan"""
        return self._month
    
    @property
    def frequency(self) -> str:
        """Getter untuk frekuensi terbit"""
        return self._frequency
    
    # ========== IMPLEMENTATION OF ABSTRACT METHODS (Polymorphism) ==========
    def display_info(self) -> str:
        """
        Implementasi spesifik untuk Magazine
        Menerapkan Polymorphism - format berbeda dari Book
        """
        status = "✓ Tersedia" if self._is_available else "✗ Dipinjam"
        return f"""
{'='*60}
MAJALAH
{'='*60}
ID         : {self._id}
Judul      : {self._title}
Editor     : {self._author}
Tahun      : {self._year}
Edisi      : #{self._issue_number}
Bulan      : {self._month}
Frekuensi  : {self._frequency}
Status     : {status}
{'='*60}
"""
    
    def get_item_type(self) -> str:
        """Implementasi method abstract"""
        return "Majalah"
    
    # ========== ADDITIONAL METHODS ==========
    def is_latest_issue(self) -> bool:
        """
        Method spesifik untuk Magazine
        Mengecek apakah edisi terbaru (tahun sekarang)
        """
        current_year = datetime.now().year
        return self._year == current_year


# ==================== SUBCLASS: DVD ====================
class DVD(LibraryItem):
    """
    Class DVD mewarisi dari LibraryItem (Inheritance)
    Merepresentasikan DVD dalam perpustakaan
    
    Additional Attributes:
        __duration (int): Durasi dalam menit (private)
        __genre (str): Genre DVD (private)
        __director (str): Sutradara (private)
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int,
                 duration: int, genre: str, director: str):
        """Constructor DVD"""
        super().__init__(item_id, title, author, year)
        self.__duration = duration
        self.__genre = genre
        self.__director = director
    
    # ========== PROPERTY DECORATORS ==========
    @property
    def duration(self) -> int:
        """Getter untuk durasi"""
        return self.__duration
    
    @property
    def genre(self) -> str:
        """Getter untuk genre"""
        return self.__genre
    
    @property
    def director(self) -> str:
        """Getter untuk sutradara"""
        return self.__director
    
    # ========== IMPLEMENTATION OF ABSTRACT METHODS ==========
    def display_info(self) -> str:
        """Implementasi spesifik untuk DVD"""
        status = "✓ Tersedia" if self._is_available else "✗ Dipinjam"
        hours = self.__duration // 60
        minutes = self.__duration % 60
        return f"""
{'='*60}
DVD
{'='*60}
ID         : {self._id}
Judul      : {self._title}
Studio     : {self._author}
Tahun      : {self._year}
Durasi     : {hours}h {minutes}m
Genre      : {self.__genre}
Sutradara  : {self.__director}
Status     : {status}
{'='*60}
"""
    
    def get_item_type(self) -> str:
        """Implementasi method abstract"""
        return "DVD"


# ==================== LIBRARY CLASS ====================
class Library:
    """
    Class untuk mengelola koleksi perpustakaan
    Menerapkan Encapsulation untuk melindungi data koleksi
    
    Attributes:
        __items (List[LibraryItem]): List item perpustakaan (private)
        __name (str): Nama perpustakaan (private)
    """
    
    def __init__(self, name: str = "Perpustakaan Digital"):
        """
        Constructor Library
        Menggunakan private attributes untuk encapsulation
        """
        self.__items: List[LibraryItem] = []
        self.__name = name
    
    # ========== PROPERTY DECORATORS ==========
    @property
    def name(self) -> str:
        """Getter untuk nama perpustakaan"""
        return self.__name
    
    @property
    def total_items(self) -> int:
        """Getter untuk total item (computed property)"""
        return len(self.__items)
    
    @property
    def available_items(self) -> int:
        """Getter untuk jumlah item tersedia"""
        return sum(1 for item in self.__items if item.is_available)
    
    # ========== PUBLIC METHODS ==========
    def add_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke perpustakaan
        Menerapkan Polymorphism - bisa menerima berbagai tipe LibraryItem
        
        Args:
            item: Object LibraryItem atau subclassnya
            
        Returns:
            bool: True jika berhasil ditambahkan
        """
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan instance dari LibraryItem")
        
        # Cek duplikasi ID
        if self.__find_item_by_id(item.id):
            print(f"Error: Item dengan ID {item.id} sudah ada!")
            return False
        
        self.__items.append(item)
        return True
    
    def display_all_items(self) -> None:
        """
        Menampilkan semua item dalam perpustakaan
        Menerapkan Polymorphism - memanggil display_info() yang berbeda untuk tiap subclass
        """
        if not self.__items:
            print("\n📚 Perpustakaan masih kosong.")
            return
        
        print(f"\n{'='*60}")
        print(f"📚 {self.__name.upper()}")
        print(f"{'='*60}")
        print(f"Total Item: {self.total_items} | Tersedia: {self.available_items}")
        print(f"{'='*60}\n")
        
        # Group by type
        books = [item for item in self.__items if isinstance(item, Book)]
        magazines = [item for item in self.__items if isinstance(item, Magazine)]
        dvds = [item for item in self.__items if isinstance(item, DVD)]
        
        if books:
            print("📖 BUKU:")
            for book in books:
                print(f"  {book}")
        
        if magazines:
            print("\n📰 MAJALAH:")
            for magazine in magazines:
                print(f"  {magazine}")
        
        if dvds:
            print("\n💿 DVD:")
            for dvd in dvds:
                print(f"  {dvd}")
        
        print(f"\n{'='*60}")
    
    def search_by_title(self, title: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul (case-insensitive, partial match)
        
        Args:
            title: Kata kunci judul
            
        Returns:
            List item yang cocok
        """
        title_lower = title.lower()
        results = [
            item for item in self.__items 
            if title_lower in item.title.lower()
        ]
        return results
    
    def search_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID
        
        Args:
            item_id: ID item
            
        Returns:
            LibraryItem jika ditemukan, None jika tidak
        """
        return self.__find_item_by_id(item_id)
    
    def borrow_item(self, item_id: str) -> bool:
        """
        Meminjam item dari perpustakaan
        
        Args:
            item_id: ID item yang akan dipinjam
            
        Returns:
            bool: True jika berhasil, False jika gagal
        """
        item = self.__find_item_by_id(item_id)
        
        if not item:
            print(f"❌ Item dengan ID '{item_id}' tidak ditemukan.")
            return False
        
        if item.borrow():
            print(f"✅ Berhasil meminjam: {item.title}")
            return True
        else:
            print(f"❌ Item '{item.title}' sedang dipinjam.")
            return False
    
    def return_item(self, item_id: str) -> bool:
        """
        Mengembalikan item ke perpustakaan
        
        Args:
            item_id: ID item yang akan dikembalikan
            
        Returns:
            bool: True jika berhasil, False jika gagal
        """
        item = self.__find_item_by_id(item_id)
        
        if not item:
            print(f"❌ Item dengan ID '{item_id}' tidak ditemukan.")
            return False
        
        if item.return_item():
            print(f"✅ Berhasil mengembalikan: {item.title}")
            return True
        else:
            print(f"❌ Item '{item.title}' tidak sedang dipinjam.")
            return False
    
    def display_statistics(self) -> None:
        """
        Menampilkan statistik perpustakaan
        Menerapkan Polymorphism dengan memanggil get_item_type()
        """
        print(f"\n{'='*60}")
        print("📊 STATISTIK PERPUSTAKAAN")
        print(f"{'='*60}")
        print(f"Nama Perpustakaan : {self.__name}")
        print(f"Total Item        : {self.total_items}")
        print(f"Item Tersedia     : {self.available_items}")
        print(f"Item Dipinjam     : {self.total_items - self.available_items}")
        
        # Count by type
        type_count = {}
        for item in self.__items:
            item_type = item.get_item_type()
            type_count[item_type] = type_count.get(item_type, 0) + 1
        
        print(f"\nJumlah per Kategori:")
        for item_type, count in type_count.items():
            print(f"  - {item_type}: {count}")
        
        print(f"{'='*60}")
    
    # ========== PRIVATE METHODS (Encapsulation) ==========
    def __find_item_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Private method untuk mencari item berdasarkan ID
        Menerapkan Encapsulation - hanya bisa diakses dari dalam class
        """
        for item in self.__items:
            if item.id == item_id:
                return item
        return None


# ==================== MAIN PROGRAM ====================
def main():
    """
    Main program untuk demonstrasi sistem perpustakaan
    """

    library = Library("Perpustakaan Universitas CENGKO")
    
    book1 = Book("B001", "Python Programming", "John Smith", 2023, 
                 "978-0-123456-78-9", 450, "Tech Publishers")
    book2 = Book("B002", "Data Science Basics", "Jane Doe", 2022,
                 "978-0-987654-32-1", 320, "Data Books Inc")
    book3 = Book("B003", "Machine Learning", "Alice Johnson", 2024,
                 "978-0-456789-12-3", 520, "AI Press")
    
    mag1 = Magazine("M001", "Tech Monthly", "Tech Media", 2024,
                    12, "November", "Bulanan")
    mag2 = Magazine("M002", "Science Today", "Science Corp", 2024,
                    156, "Desember", "Mingguan")
    
    dvd1 = DVD("D001", "The Matrix", "Warner Bros", 1999,
               136, "Sci-Fi", "Wachowski Sisters")
    dvd2 = DVD("D002", "Inception", "Warner Bros", 2010,
               148, "Thriller", "Christopher Nolan")
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(book3)
    library.add_item(mag1)
    library.add_item(mag2)
    library.add_item(dvd1)
    library.add_item(dvd2)
    

    while True:
        print(f"\n{'='*60}")
        print(f"🏛️  SISTEM MANAJEMEN {library.name.upper()}")
        print(f"{'='*60}")
        print("1. Tampilkan Semua Item")
        print("2. Cari Item berdasarkan Judul")
        print("3. Cari Item berdasarkan ID")
        print("4. Pinjam Item")
        print("5. Kembalikan Item")
        print("6. Tampilkan Detail Item")
        print("7. Tampilkan Statistik")
        print("8. Keluar")
        print(f"{'='*60}")
        
        pilihan = input("Pilih menu (1-8): ").strip()
        
        if pilihan == "1":
            library.display_all_items()
        
        elif pilihan == "2":
            keyword = input("Masukkan kata kunci judul: ").strip()
            results = library.search_by_title(keyword)
            if results:
                print(f"\n🔍 Ditemukan {len(results)} item:")
                for item in results:
                    print(f"  {item}")
            else:
                print(f"\n❌ Tidak ada item dengan judul '{keyword}'")
        
        elif pilihan == "3":
            item_id = input("Masukkan ID item: ").strip()
            item = library.search_by_id(item_id)
            if item:
                print(item.display_info())
            else:
                print(f"\n❌ Item dengan ID '{item_id}' tidak ditemukan")
        
        elif pilihan == "4":
            item_id = input("Masukkan ID item yang akan dipinjam: ").strip()
            library.borrow_item(item_id)
        
        elif pilihan == "5":
            item_id = input("Masukkan ID item yang akan dikembalikan: ").strip()
            library.return_item(item_id)
        
        elif pilihan == "6":
            item_id = input("Masukkan ID item: ").strip()
            item = library.search_by_id(item_id)
            if item:
                print(item.display_info())
                
                # Demonstrasi Polymorphism dengan method spesifik
                if isinstance(item, Book):
                    if item.is_thick_book():
                        print("📚 Ini adalah buku tebal (>300 halaman)")
                elif isinstance(item, Magazine):
                    if item.is_latest_issue():
                        print("🆕 Ini adalah edisi terbaru!")
            else:
                print(f"\n❌ Item dengan ID '{item_id}' tidak ditemukan")
        
        elif pilihan == "7":
            library.display_statistics()
        
        elif pilihan == "8":
            print("\n👋 Terima kasih telah menggunakan sistem perpustakaan!")
            break
        
        else:
            print("\n❌ Pilihan tidak valid! Silakan pilih menu 1-8.")
        
        input("\nTekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    main()