export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
  
    let menuState, transformedArray, stickyHead = []
    menuState = useSelector(state => state.reItem.itemList)
    const dispatch = useDispatch();
    useEffect(async () => {
      dispatch(getAllItem())
    }, [])
  
    transformedArray = menuState.flatMap(({ items, ...o }) => [o, ...items])
    const angkaRP = (angka) => {
      var rupiah = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    };
  
    const RefreshFunc = async () => {
      await setIsLoading(true);
      alert("refresh")
        .then(() => {
          setIsLoading(false);
        })
    }
  
    transformedArray.map(obj => {
      if (obj.price == null) {
        stickyHead.push(transformedArray.indexOf(obj));
      }
    });
    stickyHead.push(0);
    console.log('menu state', menuState)
    console.log('objectsss', transformedArray)
    console.log('keHead', stickyHead)
  
    const renderItem = ({ item }) => {
      if (item.price == null) {
        return (
          <ListItem itemDivider>
            <Text>{item.category_name}</Text>
          </ListItem>
        );
      } else {
        return (
          <ListItem onPress={() => alert("asd")} thumbnail>
            <Left >
              <Thumbnail square source={{ uri: `${item.item_image}` }} />
            </Left>
            <Body >
              <Text>{item.item_name}</Text>
              <Text note>{angkaRP(item.price)}</Text>
            </Body>
            <Right  >
              <Text>=></Text>
              <Text>=></Text>
            </Right>
          </ListItem>
        );
      }
    }
    return (
      <Container>
        <>
          <Header title="Menu List" />
          <FlatList
            refreshing={true}
            // onRefresh={RefreshFunc}
            data={transformedArray}
            renderItem={renderItem}
            keyExtractor={item => item.index}
            stickyHeaderIndices={stickyHead}
          />
          <Footer />
        </>
      </Container>
    )
  }