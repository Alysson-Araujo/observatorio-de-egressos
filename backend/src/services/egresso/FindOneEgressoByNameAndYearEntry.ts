import prismaClient from "../../prisma";

class FindOneEgressoByNameAndYearEntry {
  async execute(name: string, year_of_entry: string) {
    const egresso = await prismaClient.egresso.findFirst({
      where: {
        name: name,
        year_of_entry: year_of_entry,
      },
    });
    return egresso;
  }
}

export { FindOneEgressoByNameAndYearEntry };